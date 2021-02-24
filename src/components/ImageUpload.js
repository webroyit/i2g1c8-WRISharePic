import React, { useState } from 'react'
import { Button } from '@material-ui/core';

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

    return (
        <div>
            <input
                type="text"
                placeholder="Enter a caption..."
                onChange={event => setCaption(event.target.value)}
                value={caption} />
            <input type="file" onChange={handleChange} />
            <Button>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
