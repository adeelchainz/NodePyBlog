import React from 'react';
import {Route, Switch} from "react-router-dom";
import About from "./about";
import Login from "./RegisterLogin";
import Register from "./RegisterLogin/register";



function App() {
  return (
    <div>
{/*       {Grouping Routes}
 */}      <Switch>
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
