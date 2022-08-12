import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import GamePage from './pages/gamePage/GamePage';
import { HomeRoutesEnum } from './pages/homePage/home.props';
import 'react-toastify/dist/ReactToastify.css';
import './css/index.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage title={HomeRoutesEnum.SignIn} />} />
        <Route
          path='/register'
          element={<HomePage title={HomeRoutesEnum.Register} />}
        />
        <Route
          path='/login'
          element={<HomePage title={HomeRoutesEnum.SignIn} />}
        />
        <Route path='/game' element={<GamePage />} />
        <Route path='*' element={<HomePage title={HomeRoutesEnum.SignIn} />} />
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
