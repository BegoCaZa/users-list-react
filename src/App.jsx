import { useState } from 'react';
import { USERS } from './constants/users-info';
import { v4 } from 'uuid';

//let filteredUsers = USERS; //si esta en checked, rellena esta variable
//creo que puede hacerse con filter pero no entiendo como

const App = () => {
  //ESTADO
  const [onlyActive, setOnlyActive] = useState(false); //empieza en false el checkbox
  const [search, setSearch] = useState(''); //empieza vacio
  const [sort, setSort] = useState('default');

  //nuevos filtro

  const usersByActive = filterUserByActive(onlyActive);
  const filteredByName = filterByName(usersByActive, search);

  //filtro final
  const filteredUsers = sortByName(filteredByName, sort);

  console.log(search);

  return (
    <div className='general-container'>
      <div className='header'>
        <h1>Listado de usuarios</h1>
        <div className='filter-container'>
          <input
            type='text'
            onChange={event => setSearch(event.target.value)}
          />
          <div className='checkbox-container'>
            <label htmlFor='active-check'>Solo activos</label>
            <input
              type='checkbox'
              id='active-check'
              onClick={() => changeCheckbox(onlyActive, setOnlyActive)}
            />
          </div>

          <select onChange={event => setSort(event.target.value)}>
            <option value='default'>Default</option>
            <option value='name'>Name</option>
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

const changeCheckbox = (onlyActive, setOnlyActive) => {
  setOnlyActive(!onlyActive); //cambia el estado del checkbox
};

const filterUserByActive = onlyActive => {
  const filteredUsersByActive = onlyActive
    ? USERS.filter(user => user.active)
    : USERS;

  return filteredUsersByActive;
};

const filterByName = (usersByActive, search) => {
  const filteredUsers = search
    ? usersByActive.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    : usersByActive;

  return filteredUsers;
};

// //filtro final
// const filteredUsers = sortByName(filteredByName, sort);

const sortByName = (filteredByName, sort) => {
  const filteredUsers =
    sort === 'name'
      ? [...filteredByName].sort((a, b) => a.name.localeCompare(b.name))
      : filteredByName;

  return filteredUsers;
};

const userStateClass = user => {
  if (user.active) {
    return 'active';
  } else {
    return 'inactive';
  }
};

export default App;
