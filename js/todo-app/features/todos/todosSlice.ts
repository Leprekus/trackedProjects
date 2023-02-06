import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface TodoState {
  value: number
}

const initialState = { value: 0 } as TodoState

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo(state) {},
    deleteTodo(state) {},
    editTodo(state) {},
    incrementByAmount(state, action: PayloadAction<number>) {},
  },
})

export const { createTodo, deleteTodo, editTodo, incrementByAmount } = todosSlice.actions
export default todosSlice.reducer