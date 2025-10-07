import { useState } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Manager from './component/Manager';
import Footer from './component/Footer';
import Login from './component/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <>
      <Navbar />
      <div className='min-h-[80vh]'>
        {loggedIn ? (
          <Manager />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
