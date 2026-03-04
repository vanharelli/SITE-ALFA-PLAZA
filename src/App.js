import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';
import Home from './pages/Home';
import useSecurity from './hooks/useSecurity';
import useDoubleBackExit from './hooks/useDoubleBackExit';

function App() {
  useSecurity();
  useDoubleBackExit();

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
