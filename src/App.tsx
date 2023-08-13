import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CuratorPage } from './features/curator';
import { ParticipantPage } from './features/participant';
import { RegistrationPage } from './features/auth';
import { WelcomePage } from './features/welcome';

import './App.css';

function App() {
  return (
      <BrowserRouter basename="/">
        <Routes>
            <Route path="/" element={<RegistrationPage />}/>
            <Route path="/welcome" element={<WelcomePage />}/>
            <Route path="/participant" element={<ParticipantPage />}/>
            <Route path="/curator" element={<CuratorPage />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
