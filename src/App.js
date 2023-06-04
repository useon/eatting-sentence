import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Intro from 'page/Intro/Intro';
import Join from 'page/Join/Join';
import LogIn from 'page/LogIn/LogIn';
import Book from 'page/Book/Book';
import Drawer from 'page/Drawer/Drawer';
import AddContents from 'page/AddContents/AddContents';
// home에서 로그아웃을 따로 분리해서 해결하도록하자. 일단은 eslint 발생안되게 주석처리해놓음
// eslint-disable-next-line import/no-cycle
import Home from 'page/Home/Home';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Intro />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/join' element={<Join />} />
      <Route path='/addContents' element={<AddContents />} />
      <Route path='/book/:id' element={<Book />} />
      <Route path='/drawer/:id' element={<Drawer />} />
    </Routes>
  </BrowserRouter>
);

export default App;
