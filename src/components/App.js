import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../App.css';
import IsLogIn from '../components/IsLogIn';
import Drawer from 'page/Drawer';
import Home from 'page/Home';
import AddBook from 'page/AddBook';
import AddSentence from 'page/AddSentence';
import SignIn from 'page/SignIn';

function App() {
  return (
    <BrowserRouter>
      <IsLogIn />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/addSentence" element={<AddSentence />} />
          <Route path="/drawer/:id" element={<Drawer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
