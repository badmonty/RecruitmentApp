import React, { useState , useEffect} from 'react';
import './App.css';
import Post from "./Post.js";
import {db, auth} from './firebase';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import { Button , Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
//  import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50; 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  // props function is used here. 
   const classes = useStyles();
   const[modalStyle] = useState(getModalStyle);
   
  const [posts, setPosts] = useState([]);
  const [username , setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // here hook is used for the function. hook is very powerfull command function which uses the state function. 
  const [open, setOpen] = useState(false); 
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((authUser) => {
       if (authUser) {
          // when user logged in 
          console.log(authUser);
          setUser(authUser);
       }
       else {
        //  when user is logged out 
            setUser(null);
       }
     })

     return () => {
        // unnessasoery id creation
        // catch the listner so that it can not fave dublicate        
         unsubscribe();
     }
  }, [user, username] );



  // useEffect refresh the page of any perticular block 
   useEffect(() => {
    //  if anybody adds a posts its always updates the posts 
     db.collection('posts')
     .orderBy('timestamp' , 'desc')
    //  order by functon uses the timestamp of the firebase and arrange the post according to that
     .onSnapshot(snapshot => {
       setPosts(snapshot.docs.map(doc => ({
         id: doc.id,
         post: doc.data()
       })));

     })
   }, []);
  
   const signUp = (event) => {
       event.preventDefault();


       auth
       .createUserWithEmailAndPassword(email , password)
       .then((authUser) => {
        return authUser.user.updateProfile({
           displayName: username,
         })
       })
       .catch((error) => alert(error.message))
      //  shows up error message while sign up
   }

   const signIn = (event) => {
     event.preventDefault();
    //  its does not refresh the sign in option 

    auth
    .signInWithEmailAndPassword(email , password)
    .catch((error) => alert(error.message))
    
    setOpenSignIn(false)
   }

  return (
    <div className="app">
      
      <Modal
        //  the source code is from modal form the material ui.  as it uses the popup to enter the user's email id and password.
           open={open}
           onClose={() => setOpen(false)}>

           <div style={modalStyle} className={classes.paper}>
            {/* popup for the singup is made here */}
            <form className="app__signup">
            <center>
        <img className="app__headerImage"
        src="https://www.freepngimg.com/thumb/logo/69859-logo-photography-font-instagram-typography-png-image-high-quality-thumb.png"
        alt=""
        />
     </center>
          <Input
          placeholder="username"
          type="text"
          value ={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <Input
          placeholder="email"
          type="text"
          value ={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          placeholder="password"
          type="password"
          value ={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick = {signUp}>Sign Up</Button>
            </form>
      
 
    </div>
</Modal>
 
<Modal
        //  the source code is from modal form the material ui.  as it uses the popup to enter the user's email id and password.
           open={openSignIn}
           onClose={() => setOpenSignIn(false)}>

           <div style={modalStyle} className={classes.paper}>
            {/* popup for the singup is made here */}
            <form className="app__signup">
            <center>
        <img className="app__headerImage"
        src="https://www.freepngimg.com/thumb/logo/69859-logo-photography-font-instagram-typography-png-image-high-quality-thumb.png"
        alt=""
        />
     </center>
          
        <Input
          placeholder="email"
          type="text"
          value ={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          placeholder="password"
          type="password"
          value ={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick = {signIn}>Sign In</Button>
            </form>
      
 
    </div>
</Modal>

     <div className="app__header">
      <img 
      className="app__headerImage"
        src= "https://www.freepngimg.com/thumb/logo/69859-logo-photography-font-instagram-typography-png-image-high-quality-thumb.png"
       alt=""
       />

      {user ? (
        <Button onClick = {() => auth.signOut()}>Logout</Button>
      ): (
        <div className="app__loginContainer">
        <Button onClick = {() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick = {() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
    </div>
 
        <div className="app__posts">
       {
         posts.map(({id, post}) => (
          //  here id is used to extend the user identity with the individual key constants
           <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          // here key={id} is used for it is used to get the new post without rerendering the old post
           ))
       }
        </div>
             
           
       {user?.displayName ? (
                <ImageUpload username={user.displayName}/>
          ): (
            <h3>you need to login and signup</h3>
          )}
         

    </div>

  );
}


export default App;
