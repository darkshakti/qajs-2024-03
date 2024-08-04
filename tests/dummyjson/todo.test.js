import { TodoService } from '../../framework'

describe('Todo', () => {
  it('Should return a todo', async () => {
    const response = await TodoService.get(2)
    expect(response.status).toBe(200)
    expect(response.data).toStrictEqual({
      id: 2,
      completed: true,
      todo: 'Memorize a poem',
      userId: 13,
    })
  })

  it('Should return 404 if todo not exits', async () => {
    const response = await TodoService.get(10_000)
    expect(response.status).toBe(404)
    expect(response.data).toStrictEqual({
      message: "Todo with id '10000' not found",
    })
  })

  it.todo('Should return a random todo')
  it.todo('Should return all todo by user id')
  it.todo('Should correct add new todo')
  it.todo('Should correct update todo')
  it.todo('Should delete todo')
})
