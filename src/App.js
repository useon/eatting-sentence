import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import '../App.css';
import Book from 'page/Book';
import Home from 'page/Home';
import LogIn from 'page/Login/LogIn';
import AddContents from 'page/AddContents';
import Drawer from 'page/Drawer';
import Intro from 'page/Intro/Intro';
import Join from 'page/Join/Join';

function App() {
  return (
    <AppStyle>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Intro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/join" element={<Join />} />
            <Route path="/addContents" element={<AddContents />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/drawer/:id" element={<Drawer />} />
          </Routes>
      </BrowserRouter>
    </AppStyle>
  );
}

export default App;

const AppStyle = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
`