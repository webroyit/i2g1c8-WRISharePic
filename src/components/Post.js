import React, { useState, useEffect } from 'react'
import Avatar from "@material-ui/core/Avatar"

import { db } from '../firebase';
import './Post.css'

function Post({ postId, imageUrl, username, caption }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let unsubscribe;

        // Get the comments from a post on firebase
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                // Listen to the changes only for that post
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()));
                })
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="1" />
                <h3>{username}</h3>
            </div>

            <img
                className="post__image"
                src={imageUrl}
                alt="Post" />
            
            <h4 className="post__text">
                <strong>{username}: </strong>{caption}
            </h4>

            <div className="post__comments">
                {comments.map(comment => (
                    <p>
                        <strong>{comment.username}: </strong>{comment.text}
                    </p>
                ))}
            </div>

            <form className="post__commentBox">
                <input
                    className="post__input"
                    placeholder="Add a comment..."
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
                <button
                    className="post__button"
                    disabled={!comment}
                    type="submit"
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default Post
