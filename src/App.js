import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([])

  // Runs a piece of code based on a specific condition
  useEffect(() => {
    // This is where the code runs

    // 'onSnapshot' is a listener
    db.collection('posts').onSnapshot(snapshot => {
      // Every time a new post is added, this code fires
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="images/logo.png"
          alt="Logo" />
      </div>

      {
        posts.map((post, index) => (
          <Post
            key={index}
            imageUrl={post.imageUrl}
            username={post.username}
            caption={post.caption} />
        ))
      }
    </div>
  );
}

export default App;
