import { Button } from '@material-ui/core'
import React , {useState} from 'react'
import firebase from 'firebase'
import {storage, db } from "./firebase"
import './ImageUpload.css'

function ImageUpload({username}) {
    const [image , setImage] = useState(null);
    const [progress , setProgress] = useState(0);
    const [caption , setCaption] = useState('');

  const handleChange = (e) => {
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  }

  const handleUpload = () => {
      
     const uploadTask = storage.ref(`images/${image.name}`).put(image);

     uploadTask.on(
         "state_changed",
         (snapshot) => {
             const progress = Math.round(
                //  the progress botton works here (visual for the progress bar)
                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
             );
             setProgress(progress);
         },
         (error) => {
             console.log(error);
             alert(error.message);
         },
         () => {
             storage
             .ref("images")
             .child(image.name)
             .getDownloadURL()
             .then(url => {
                //  post the image stored in database
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    // its the server time stamp. different time stamp for different country
                    caption : caption,
                    imageUrl : url,
                    // here the process is upload the firebase storage gives the download link the downlod link with the above line 
                    username : username
                });
                // reset the progress back to normal after the process is done 
                setProgress(0);
                setCaption("");
                setImage(null);
             });
         }
     );
      };

    return (
        <div className="imageupload">
            <progress className="imageUpload__progress" value={progress} max="100" />
            {/* input for caption in the post  */}
            <input type="text" placeholder='Enter a caption....' onChange={event => setCaption(event.target.value)} value={caption}/>
            {/* input the file type choosen to upload */}
            <input type="file" onChange={handleChange} />
            {/* upload Button to upload a file */}
            <Button onClick={handleUpload}>Upload </Button>
        </div>
    )
}

export default ImageUpload
