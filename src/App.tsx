import React from "react";
import { Link, Route } from "react-router-dom";
import loadable from "@loadable/component";

const Home = loadable(() => import("./page/Home"));
const About = loadable(() => import("./page/About"));

const App: React.FC = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/home">홈</Link>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </div>
    </>
  );
};

export default App;
