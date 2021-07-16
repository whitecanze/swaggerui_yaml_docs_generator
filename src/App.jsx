import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Generator from './components/generator'
import Form from './components/Form'

function App() {

  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Generator} />
          <Route exact path="/cal" component={Form} />
          <Route path="/generator"><Redirect to="/" /></Route> 
          <Route><Redirect to="/" /></Route> 
      </Switch>
    </Router>
  )
}

export default App
