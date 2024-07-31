import supertest from 'supertest'
import config from '../config/configBookstore'

const getBooks = async () => {
  const response = await supertest(config.baseURL).get('/BookStore/v1/Books')

  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  }
}

const getBook = async isbn => {
  const response = await supertest(config.baseURL).get(
    `/BookStore/v1/Book?ISBN=${isbn}`,
  )

  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  }
}

export default {
  getAll: getBooks,
  getBookInformation: getBook,
}
