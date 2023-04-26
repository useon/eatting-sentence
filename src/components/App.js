import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../App.css';
import Book from 'page/Book';
import Home from 'page/Home';
import SignIn from 'page/SignIn';
import AddContents from 'page/AddContents';
import Drawer from 'page/Drawer';
import Intro from '../page/Intro';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/addContents" element={<AddContents />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/drawer/:id" element={<Drawer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
