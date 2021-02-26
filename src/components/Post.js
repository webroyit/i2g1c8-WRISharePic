import React, { useState, useEffect } from 'react'
import Avatar from "@material-ui/core/Avatar"
import firebase from 'firebase';

import { db } from '../firebase';
import './Post.css'

function Post({ postId, imageUrl, user, username, caption }) {
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
                .orderBy('timestamp', 'desc')
                // Listen to the changes only for that post
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()));
                })
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = event => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

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

            {user && (
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
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    )
}

export default Post
