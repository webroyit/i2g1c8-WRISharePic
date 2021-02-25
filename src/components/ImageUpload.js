import React, { useState } from 'react'
import firebase from 'firebase';
import { Button } from '@material-ui/core';

import { db, storage } from '../firebase';

function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = event => {
        // Get the first image that was uploaded
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleUpload = () => {
        // 'ref' for the location to store the image on firebase
        // 'put' to store the image on firebase
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        // Upload Image on firebase is an asynchronous process
        // 'on' for listener
        uploadTask.on(
            "state_changed",
            snapshot => {
                // Progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(progress);
            },
            error => {
                // Error function
                console.log(error);
                alert("Something went wrong");
            },
            () => {
                // Complete function

                // Get the url of the image that was uploaded on firebase storage
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // Add a post on firebase
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,       // Post image url inside firebase database
                            username: username
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }

    return (
        <div>
            <progress value={progress} />
            <input
                type="text"
                placeholder="Enter a caption..."
                onChange={event => setCaption(event.target.value)}
                value={caption} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
