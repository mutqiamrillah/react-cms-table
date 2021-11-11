import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Cms } from 'pages'

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Cms />
      </Route>
    </Router>
  )
}

export default App