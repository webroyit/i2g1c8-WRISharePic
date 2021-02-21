import React from 'react'
import Avatar from "@material-ui/core/Avatar"

import './Post.css'

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Ken Car"
                    src="1" />
                <h3>Ken Car</h3>
            </div>

            <img
                className="post__image"
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                alt="Post" />
            
            <h4 className="post__text">
                <strong>Bob: </strong>Keep up the good work!
            </h4>
        </div>
    )
}

export default Post
