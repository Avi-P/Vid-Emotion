import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Sites/Home/Home"
import AppSite from "./Sites/App_Site/App_Site"
import Analytics from "./Sites/Analytics/Analytics"

import withAuth from './Components/withAuth'

import './App.css';

/* Contains router for different web pages in the react app */
function App() {
  return <>
      <Router>
        <div>
            <Route path="/" exact component={Home} />
            <Route path="/analytics" component={withAuth(Analytics)} />
            <Route path="/app" component={withAuth(AppSite)} />
        </div>
      </Router>
   </>;
}

export default App;