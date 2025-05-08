import { useState } from 'react';
import { USERS } from './constants/users-info';
import { v4 } from 'uuid';

//let filteredUsers = USERS; //si esta en checked, rellena esta variable
//creo que puede hacerse con filter pero no entiendo como

const App = () => {
  //ESTADO
  const [activeOnly, setActiveOnly] = useState(false); //empieza en false el checkbox

  const filteredUsers = filterUser(activeOnly); //no se si estoy llamando a muchas funciones

  return (
    <div className='general-container'>
      <div className='header'>
        <h1>Listado de usuarios</h1>
        <div className='filter-container'>
          <input type='text' id='text-search' onChange={() => compare} />
          <div className='checkbox-container'>
            <label htmlFor='active-check'>Solo activos</label>
            <input
              type='checkbox'
              id='active-check'
              onClick={() => changeCheckbox(activeOnly, setActiveOnly)}
            />
          </div>

          <select>
            <option value='default'>Por Defecto</option>
            <option value='name'>Por Nombre</option>
          </select>
        </div>
      </div>
      <div className='user-list'>
        {filteredUsers.map(user => (
          <div className='user-card' key={v4()}>
            <div className='user-image-info-container'>
              <img src={user.profileImage} className='user-image' />
              <div className='user-info'>
                <h2 className='name'>{user.name}</h2>
                <span className='username'>@{user.username}</span>
              </div>
            </div>
            <div className='details-container'>
              <p className={userStateClass(user)}>
                {user.active ? 'Activo' : 'Inactivo'}
              </p>
              {/* debe RECIBIR y enviar a la funcion para que lea la clase */}
              <button className='details-button'>Ver Detalles</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const changeCheckbox = (activeOnly, setActiveOnly) => {
  setActiveOnly(!activeOnly); //cambia el estado del checkbox
  return activeOnly; //devuelve el estado del checkbox

  // //filtro de usuarios
  // if (!activeOnly) {
  //   filteredUsers = USERS.filter(user => user.active);
  // } else {
  //   filteredUsers = USERS;
  // }
};

const filterUser = activeOnly => {
  //si activeOnly es true, filtra los usuarios activos, sino devuelve todos
  if (activeOnly) {
    return USERS.filter(user => user.active);
  } else {
    return USERS;
  }
};

const userStateClass = user => {
  if (user.active) {
    return 'active';
  } else {
    return 'inactive';
  }
};

export default App;
