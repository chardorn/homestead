import Map from './Map.js';
import Editor from './Editor.js';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


const Routes = () => (
    <Router>
    <Switch>
      <Route exact path="/" component={Map} />
      <Route exact path="/editor" component={Editor} />
    </Switch>
    </Router>

)

export default Routes;