import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Generator from './components/generator'
import Form from './components/Form'

function App() {

  return (
    <HashRouter hashType="noslash">
      <Switch>
          <Route exact path="/" component={Generator} />
          <Route exact path="/cal" component={Form} />
          <Route>
            <Redirect to="/" />
          </Route> 
      </Switch>
    </HashRouter>
  )
}

export default App
