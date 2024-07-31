import config from '../../framework/config/configBookstore'
import {
  BookService,
  AuthService,
  UserService,
  UserBookService,
} from '../../framework'
import { books } from '../../framework/fixtures/Books.json'

describe('Books', () => {
  const userId = config.userId
  const [book1, book2, book3] = books
  const isbn = book1.isbn
  const isbn2 = book2.isbn
  const isbn3 = book3.isbn
  const isbns = [isbn, isbn2]
  
  let token

  beforeAll(async () => {
    const { data } = await AuthService.generateToken({
      userName: config.userName,
      password: config.password,
    })

    token = data.token
  })

  test.each(isbns)(
    'Test-1: Добавление книги в коллекцию к пользователю (ISBN: %s)',
    async (isbn) => {
      const responseAddListOfBooks = await UserBookService.addList({
        userId,
        isbns: [isbn],
        token,
      })

      expect(responseAddListOfBooks.status).toBe(201)
      expect(responseAddListOfBooks.data).toEqual({ books: [{ isbn }] })
    }
  )

  test('Test-2: Заменить книгу в коллекции пользователя', async () => {
    const responseAddBook = await UserBookService.replace({
      userId,
      fromIsbn: isbn,
      toIsbn: isbn3,
      token,
    })

    expect(responseAddBook.data).toEqual({
      userId,
      username: config.userName,
      books: [book2, book3],
    })
  })

  test.each(isbns.map(isbn => [isbn]))('Test-3: Получить информацию о книге (ISBN: %s)', async (isbn) => {
    const response = await BookService.getBookInformation(isbn)
  
    expect(response.status).toBe(200)
    expect(response.data.isbn).toBe(isbn)
  })  

  test('Test-4: Удаление книги из коллекции пользователя', async () => {
    const responseOnlyOneBook = await UserBookService.removeBook({
      userId,
      token,
      isbn: isbn3,
    })

    expect(responseOnlyOneBook.status).toBe(204)

    const responseUser = await UserService.get({
      userId,
      token,
    })

    expect(responseUser.data.books).toEqual([book2])
  }, 10000)

  test('Test-5: Список книг', async () => {
    const response = await BookService.getAll()

    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
  })

  test('Test-6: Удаление всех книг из коллекции пользователя', async () => {
    const responseRemoveAll = await UserBookService.removeAll({
      userId,
      token,
    })
    expect(responseRemoveAll.status).toBe(204)

    const responseUser = await UserService.get({
      userId,
      token,
    })
    expect(responseUser.data.books).toEqual([])
  })
})
