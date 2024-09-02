import axios from 'axios'
import config from '../config/configDummyjson'

const client = axios.create({
  baseURL: `${config.baseURL}/quotes`,
  validateStatus: null,
})

const getAllQuotes = async ({ limit, skip }) => {
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

const getQuote = async id => {
  const response = await client.get(`/${id}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

const getRandomQuote = async () => {
  const response = await client.get(`/random`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  }
}

export default {
  getAll: getAllQuotes,
  get: getQuote,
  getRandom: getRandomQuote,
}
