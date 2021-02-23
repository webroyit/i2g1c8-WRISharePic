import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Input, Button } from '@material-ui/core';

import './App.css';
import Post from './components/Post';
import { db } from './firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Runs a piece of code based on a specific condition
  useEffect(() => {
    // This is where the code runs

    // 'onSnapshot' is a listener
    db.collection('posts').onSnapshot(snapshot => {
      // Every time a new post is added, this code fires
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="images/logo.png"
                alt="Logo" />
            </center>

            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <Button>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="images/logo.png"
          alt="Logo" />
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button>

      {
        // Destructor id and post from post
        posts.map(({id, post}) => (
          <Post
            key={id}
            imageUrl={post.imageUrl}
            username={post.username}
            caption={post.caption} />
        ))
      }
    </div>
  );
}

export default App;
