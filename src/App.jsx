import { useState } from 'react';
import { USERS } from './constants/users-info';
import { v4 } from 'uuid';

const App = () => {
  const userStateClass = user => {
    if (user.active) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  return (
    <div className='general-Container'>
      <div className='header'>
        <h1>Listado de usuarios</h1>
        <div className='filter-container'>
          <input type='text' />
          <input type='checkbox' id='active-check' />
          <label htmlFor='active-check'>Solo activos</label>
          <select>
            <option value='default'>Por Defecto</option>
            <option value='name'>Por Nombre</option>
          </select>
        </div>
      </div>
      <div className='user-list'>
        {USERS.map(user => (
          <div className='user-card' key={v4()}>
            <img src={user.profileImage} className='user-image' />
            <div className='user-info'>
              <h2>{user.name}</h2>
              <span>@{user.username}</span>
            </div>
            <div className='details-container'>
              <p className={userStateClass}>
                {user.active ? 'Activo' : 'Inactivo'}
              </p>
              <button className='details-button'>Ver Detalles</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
