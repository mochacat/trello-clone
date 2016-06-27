import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import boards from './boards'
import lists from './lists'

const rootReducer = combineReducers({
  boards, lists, routing: routerReducer
})

export default rootReducer