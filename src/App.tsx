import { useUnit } from 'effector-react';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { CuratorPage } from './features/curator';
import { ParticipantPage } from './features/participant';
import { RegistrationPage } from './features/auth';
import { WelcomePage } from './features/welcome';
import { FinishPage } from './features/finish';

import { $userStore, getMe } from './entities/user';
import { setAuthToken, removeAuthToken } from './shared/lib';
import { Page } from './shared/ui/page';

import './App.css';

function App() {
  return (
    <BrowserRouter basename="/">
      <Redirects>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/participant" element={<ParticipantPage />} />
          <Route path="/curator" element={<CuratorPage />} />
          <Route path="/finisher" element={<FinishPage />} />
        </Routes>
      </Redirects>
    </BrowserRouter>
  );
}

const Redirects = ({ children }: React.PropsWithChildren) => {
  const [shouldRender, setShouldRender] = React.useState(false);

  const { me, loading } = useUnit($userStore);

  const redirect = useNavigate();

  React.useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      setShouldRender(true);
      redirect('/');
      return;
    }

    getMe()
      .then(() => {
        setShouldRender(true);
      })
      .catch(() => {
        removeAuthToken();
        setShouldRender(true);
        redirect('/');
      });
  }, []);

  React.useEffect(() => {
    if (loading) {
      return;
    }

    setShouldRender(true);
    if (!me) {
      redirect('/');
    } else if (!localStorage.getItem('agreed')) {
      redirect('/welcome');
    } else if (me.is_curator) {
      redirect('/curator');
    } else {
      redirect('/participant');
    }
  }, [loading, me]);

  if (!shouldRender) {
    return <Page>Авторизация...</Page>;
  }

  return <>{children}</>;
};

export default App;
