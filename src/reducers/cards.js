//reducers take in action (info about what happened) & copy of current state
//take in state, modify, then return updated state
import { TOGGLE_PIN, ADD_CARD, REMOVE_CARD, EDIT_CARD, MOVE_CARD } from '../constants/actionTypes'

const initialState = []

export default function cards(state = initialState, action) {
  switch(action.type) {
    case ADD_CARD: {
      return [...state, action.card]
    }
    case REMOVE_CARD: {
      const i = state.findIndex(card => card._id === action.cardId)
      return [
        ...state.slice(0,i),
        ...state.slice(i+1)
      ]
    }
    case EDIT_CARD: {
      const i = state.findIndex(card => card._id === action.card._id)
      return [
        ...state.slice(0,i),
        { ...state[i], ...action.card },
        ...state.slice(i+1)
      ]
    }
    case MOVE_CARD: {
      const cards = [...state]
      
      //fill in new list or position for card
      const card_index = cards.findIndex(card => card._id === action.cardId)
      
      //need new and old list ids to increment other cards appropriately 
      const old_list = cards[card_index]._list
      const list = action.listId
      
      //fill in new details
      
      const moved_card = Object.assign({}, cards[card_index], {
        _list: list,
        position: action.position
      })
      
      cards[card_index] = moved_card
      
      //increment position by 1 for cards in new list that came after moved card's position
      //decrease position by 1 for cards in old list that came after moved card's position
      let newState = cards.map( (card) => {
        if (card.position >= action.position && card._id !== action.cardId) {
          if (card._list == old_list || card._list == list) {
            card._list == list ? card.position++ : card.position--
          }
        }
        return card
      })
      
      return newState
    }
    default: 
      return state
  }
}
