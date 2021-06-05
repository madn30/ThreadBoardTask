import React from 'react'
import { Route, BrowserRouter as Router, } from "react-router-dom"
import MainPage from "./component/MainPage/MainPage"
import AddThread from "./component/AddThread/AddThread"
import Comments from "./component/Comments/Comments"

function App() {

  return (
    <div>
      <Router>
        <Route path="/" exact component={MainPage} />
        <Route path="/addthread" component={AddThread} />
        <Route path="/comment" component={Comments} />

      </Router>
    </div>
  )
}

export default App
