import React  from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from './pages/Welcome';
import "antd/dist/antd.css";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/welcome" component={Welcome} />
      </div>
    </Router>
  );
}

export default AppRouter;