import React from 'react';

import Register from './Register.jsx';
import ListUsers from './ListUsers.jsx';

export const App = () => {

  return (
    <div>
      <h1 className='text-3xl font-semibold  text-center py-2'
      >Docmovi Challenge</h1>
      <Register />
      <h2 className='text-2xl font-semibold uppercase py-2'
      >Lista de Usuario</h2>
      <ListUsers />




    </div>
  )
};
