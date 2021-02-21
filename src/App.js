
import './App.css';
import Post from './components/Post'

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="images/logo.png"
          alt="Logo" />
      </div>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
