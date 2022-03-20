import React, { useState , useEffect} from 'react';
import './App.css';
import {auth} from './firebase';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import { Button , Input } from '@material-ui/core';
import Table from './Table';


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
   
  
  const [username , setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // here hook is used for the function. 
  //hook is very powerful command function which uses the state function. 
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
        // unnecessary id creation
        // catch the listener so that it can not have duplicate        
         unsubscribe();
     }
  }, [user, username] );



  // useEffect refresh the page of any particular block 
  
  
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
        //  the source code is from modal from the material ui.  as it uses the popup to enter the user's email id and password.
           open={open}
           onClose={() => setOpen(false)}>

           <div style={modalStyle} className={classes.paper}>
           
            <form className="app__signup">
            <center>
       <h1>Create an Account</h1>
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
            {/* popup for the signup is made here */}
            <form className="app__signup">
            <center>
            <h1>Sign In</h1>
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
     <h1>Recruitment App</h1>

      {user ? (
        <Button onClick = {() => auth.signOut()}>Logout</Button>
      ): (
        <div className="app__loginContainer">
        <Button onClick = {() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick = {() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
    </div>
           
       {user?.displayName ? (
         <>
              <h1 className ="login">Welcome {user.displayName} !!</h1>
              <Table />
         </>
          ): (
            <h1 className ="login">You Need to Login or Signup to Continue</h1>
          )}
         
    
    </div>

  );
}


export default App;
