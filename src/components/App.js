import React from 'react';
import Homepage from './HomePage';
import AboutPage from './AboutPage';
import { Header } from './common/Header';
import CoursesPage from './CoursesPage';
function App() {
  function getPage() {
    const route = window.location.pathname;
    if (route === '/about') return <AboutPage />;
    if (route === '/courses') return <CoursesPage />;

    return <Homepage />;
  }
  return (
    <div className="container-fluid">
      <Header />
      {getPage()}
    </div>
  );
}

export default App;
