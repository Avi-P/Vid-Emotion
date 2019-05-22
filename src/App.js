import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Sites/Home/Home"
import AppSite from "./Sites/App_Site/App_Site"
import Analytics from "./Sites/Analytics/Analytics"

import './App.css';

function App() {
  return <>
      <Router>
        <div>
            <Route path="/" exact component={Home} />
            <Route path="/app" component={AppSite} />
            <Route path="/analytics" component={Analytics} />
        </div>
      </Router>
   </>;
}

export default App;


