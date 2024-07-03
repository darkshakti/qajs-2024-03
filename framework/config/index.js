import 'dotenv/config'

export default Object.freeze({
  baseURL:
    process.env.TEST_DUMMYJSON_BASE_API_URL ?? 'TEST_DUMMYJSON_BASE_API_URL',
  username: process.env.TEST_DUMMYJSON_USERNAME,
  password: process.env.TEST_DUMMYJSON_PASSWORD,
})
