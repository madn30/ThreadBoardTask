import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, } from "react-router-dom"
import MainPage from "./component/MainPage/MainPage"
import AddThread from "./component/AddThread/AddThread"
import Comments from "./component/Comments/Comments"
import { useSelector, useDispatch } from 'react-redux';
import { getThreads } from "./actions/threads"

function App() {

  const threads = useSelector((state) => state.threads)
  const dispatch = useDispatch();

  useEffect(() => {
    if (threads.length === 0) dispatch(getThreads());
  }, [])

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
