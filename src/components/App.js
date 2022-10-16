import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../App.css'
import IsLogIn from '../components/IsLogIn'
import Drawer from 'page/Drawer';
import Home from 'page/Home';
import NewBook from 'page/NewBook';
import NewSentence from 'page/NewSentence';
import EditBook from 'page/EditBook';
import EditSentence from 'page/EditSentence';
import SignIn from 'page/SignIn';


function App() {
  return (
    < BrowserRouter >
      <IsLogIn />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/newBook' element={<NewBook />} />
          <Route path='/newSentence' element={<NewSentence />} />
          <Route path='/drawer/' element={<Drawer />} />
          <Route path='/editBook/' element={<EditBook />} />
          <Route path='/editSentence/' element={<EditSentence />} />
        </Routes>
      </div>
    </ BrowserRouter>
  );
}

export default App;