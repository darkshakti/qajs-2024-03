import axios from 'axios'
import config from '../config/configDummyjson'

const client = axios.create({
  baseURL: `${config.baseURL}/todos`,
  validateStatus: null,
})

const getAllTodos = async ({ limit, skip }) => {
  const response = await client.get('/', {
    params: {
      limit,
      skip,
    },
  })

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

const getTodo = async id => {
  const response = await client.get(`/${id}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

const getRandomTodo = async () => {
  const response = await client.get(`/random`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

const getAllTodosByUserId = async userId => {
  const response = await client.get(`/user/${userId}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

const addTodo = async data => {
  const response = await client.post('/', data)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

const updateTodo = async data => {
  const response = await client.put(`/`, data)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

const deleteTodo = async id => {
  const response = await client.delete(`/` + id)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

export default {
  getAll: getAllTodos,
  get: getTodo,
  getRandom: getRandomTodo,
  getAllByUserId: getAllTodosByUserId,
  add: addTodo,
  update: updateTodo,
  delete: deleteTodo,
}
