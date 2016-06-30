import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import boards from './boards'
import lists from './lists'
import cards from './cards'

const rootReducer = combineReducers({
  boards, lists, cards, routing: routerReducer
})

export default rootReducer