import React from 'react'
import { render } from 'react-dom'

//import components

import App from './containers/App'
import BoardGrid from './components/BoardGrid'
import BoardPage from './components/BoardPage'
import CardModal from './components/CardModal'

//import react-router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

//load redux deps
import { Provider } from 'react-redux'
import store, { history } from './store'

const router = (
  //change url without reloading page
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        //match everything for /
        <IndexRoute component={BoardGrid}></IndexRoute>
        //nested routes
        <Route path="/board/:id" component={BoardPage}></Route>
        <Route path="/card/:id" component={CardModal}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.querySelector('#root'))
