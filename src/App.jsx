import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Generator from './components/generator'

function App() {

  return (
    <Router>
      <Switch>
          <Route exact path="/generator" component={Generator} />
          <Route path="*">
            <Redirect to="/generator" />  
          </Route> 
      </Switch>
    </Router>
  )
}

export default App
