import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

const Home = loadable(/* #__LOADABLE__ */ () => import("./page/Home"));
const About = loadable(/* #__LOADABLE__ */ () => import("./page/About"));

type Props = {};

console.log(process.env.NODE_ENV, process.env.NODE_ENV === "production");
const App: React.FC<Props> = props => {
  return (
    <>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/home">홈</Link>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about/:counter" component={About} />
          <Route path="/about" component={About} />
        </Switch>
      </main>
    </>
  );
};

export default App;
