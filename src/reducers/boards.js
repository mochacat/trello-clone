//reducers take in action (info about what happened) & copy of current state
//take in state, modify, then return updated state
import { TOGGLE_PIN, ADD_BOARD, REMOVE_BOARD, EDIT_BOARD } from '../constants/actionTypes'

const initialState = []

export default function boards(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_PIN: {
      const i = state.findIndex(board => board._id === action.boardId)
      console.log(state)
      return [
        ...state.slice(0,i),
        {...state[i], pinned: !state[i].pinned},
        ...state.slice(i+1)
      ]
    }
    case ADD_BOARD: {
      return [...state, action.board]
    }
    case REMOVE_BOARD: {
      const i = state.findIndex(board => board._id === action.boardId)
      return [
        ...state.slice(0,i),
        ...state.slice(i+1)
      ]
    }
    case EDIT_BOARD: {
      const i = state.findIndex(board => board._id === action.board._id)
      return [
        ...state.slice(0,i),
        { ...state[i], ...action.board },
        ...state.slice(i+1)
      ]
    }
    default: {
      return state
    }
  }
}