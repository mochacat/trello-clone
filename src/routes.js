import React from 'react'

import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import BoardGrid from './components/BoardGrid'
import BoardPage from './components/BoardPage'
import CardModal from './components/CardModal'


export default (<Route path="/" component={App}>
  //match everything for /
  <IndexRoute component={BoardGrid}></IndexRoute>
  //nested routes
  <Route path="/board/:id" component={BoardPage}></Route>
  <Route path="/card/:id" component={CardModal}></Route>
</Route>)