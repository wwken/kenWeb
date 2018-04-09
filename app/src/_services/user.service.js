import { authHeader } from '../_helpers';
var isArrayEmpty = require('./../utils/objUtils').isArrayEmpty;
var config = require('./../restful-servers/server/config');

var rand = function() {
  return Math.random()
    .toString(36)
    .substr(2); // remove `0.`
};

var token = function() {
  return rand() + rand(); // to make it longer
};

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

const address = 'http://' + config.server.host + ':' + config.server.port;

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: 'json=' + JSON.stringify({ username, password }),
  };
  return fetch(address + '/users/authenticate', requestOptions)
    .then(handleResponse)
    .then(users => {
      var user = null;
      if (!isArrayEmpty(users)) {
        user = users[0];
        user.token = token();
        // login successful if there's a jwt token in the response
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

/*
  This method sould be called to get all previous saved stuffs
 */
function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch('/users', requestOptions).then(function(s) {
    return {
      user: JSON.parse(localStorage.getItem('user')),
    };
  });
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch('/users/' + id, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch('/users/register', requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch('/users/' + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch('/users/' + id, requestOptions).then(handleResponse);
}
