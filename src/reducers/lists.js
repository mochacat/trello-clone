import { ADD_LIST, REMOVE_LIST, EDIT_LIST } from '../constants/actionTypes'

const initialState = []

export default function lists(state = initialState, action) {
  switch (action.type) {
    case ADD_LIST: {
      return [...state, action.list]
    }
    case REMOVE_LIST: {
      //need to remove list and all cards with list
      const i = state.findIndex(list => list._id === action.listId)
      return [
        ...state.slice(0,i),
        ...state.slice(i+1)
      ]
    }
    case EDIT_LIST: {
      const i = state.findIndex(list => list._id === action.list._id)
      return [
        ...state.slice(0,i),
        { ...state[i], ...action.list },
        ...state.slice(i+1)
      ]
    }
    default: {
      return state
    }
  }
}