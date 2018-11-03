import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3004';

// RESTful API
// CRUD operations

const Api = route => ({
  read: () => axios.get(route),
  create: data => axios.post(route, data),
  delete: data => axios.delete(`${route}/${data.id}`),
  update: data => axios.put(`${route}/${data.id}`, data)
});

export default Api;