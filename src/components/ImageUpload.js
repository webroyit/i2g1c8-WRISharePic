import React, { useState } from 'react'
import { Button } from '@material-ui/core';

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Enter a caption..."
                onChange={event => setCaption(event.target.value)}
                value={caption} />
            <input type="file" />
            <Button>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
