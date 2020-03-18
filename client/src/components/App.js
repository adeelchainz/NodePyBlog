import React from 'react';
import {Route, Switch} from "react-router-dom";
import About from "./about";



function App() {
  return (
    <div>
{/*       {Grouping Routes}
 */}      <Switch>
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
