import React, { useState } from 'react';
import './App.css';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([
    {
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      username: "Ken Car",
      caption: "Keep up the good work!"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8ZWF0aW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      username: "Eating Time",
      caption: "I love my foods"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cnVubmluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      username: "Jill Running",
      caption: "Walking at sun rise"
    }
  ])

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
