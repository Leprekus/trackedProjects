//import request from 'supertest'
import todosApi from '../pages/api/todos'
describe('Todos', () => {
    it('GET -> array of todos', () => {
         return expect(2).toBe(2)
    })
    it('GET -> array specific todo by id', () => {
    })
    it('POST -> create todo', () => {})
    it('DEL -> delete todo', () => {})
    it('PUT -> edit todo', () => {})
    it('PUT -> mark todo as completed', () => {})
    it('GET -> display error page when something goes wrong', () => {})
    it('GET -> display error page when todo is not found', () => {})
})