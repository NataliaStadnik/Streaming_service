import axios from '../node_modules/axios/index';

axios
  .post('http://localhost:3000/api/auth/login', {
    username: "qq",
    password: "aa"
  })
  .then(function (response) {
    const token = response.data.access_token
    sessionStorage.setItem('token', token)
  })

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
});



// register()

// async function register() {
//   const response = await fetch('http://localhost:3000/api/auth/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "username": "qq",
//       "password": "aa",
//       "firstName": "Natalia",
//       "lastName": "Stadnik"
//     })
//   })
//     return await response.json();
// }
