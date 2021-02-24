import React, { useState } from 'react'
import { Button } from '@material-ui/core';

import { db, storage } from '../firebase';

function ImageUpload() {
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
    }

    return (
        <div>
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
