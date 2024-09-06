import React from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';

function Home() {
  return (
    <div>
      <Dashboard/>
      <Sidebar/>
    </div>
  )
}

export default Home;