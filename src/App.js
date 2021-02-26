import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Input, Button } from '@material-ui/core';

import './App.css';
import Post from './components/Post';
import ImageUpload from './components/ImageUpload';
import { auth, db } from './firebase';

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
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Listener for the front end
  useEffect(() => {
    // This is a listener on firebase
    // It uses cookie tracking to check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // User is logged in
        console.log(authUser);
        setUser(authUser);

        // if (authUser.displayName) {
        //   // Don't update username
        // } else {
        //   // For new user
        //   // Update username name
        //   return authUser.updateProfile({
        //     displayName: username
        //   })
        // }
      } else {
        // User is logged out
        setUser(null);
      }
    })

    return () => {
      // Perform some cleanup actions

      // Remove listener when finish
      unsubscribe();
    }
  }, [user, username]);

  // Runs a piece of code based on a specific condition
  useEffect(() => {
    // This is where the code runs

    // Get list of posts from firebase
    db
      .collection('posts')
      // sort the posts by timestamp
      .orderBy('timestamp', 'desc')
      // 'onSnapshot' is a listener
      .onSnapshot(snapshot => {
        // Every time a new post is added, this code fires
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })))
    })
  }, []);

  const signUp = event => {
    event.preventDefault();
     
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = event => {
    event.preventDefault();
     
    auth
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
    
    setOpenSignIn(false);
  }

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

            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
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
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="images/logo.png"
          alt="Logo" />

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {
          // Destructor id and post from post
          posts.map(({id, post}) => (
            <Post
              key={id}
              postId={id}
              imageUrl={post.imageUrl}
              username={post.username}
              caption={post.caption} />
          ))
        }
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Login to upload</h3>
      )}
    </div>
  );
}

export default App;
