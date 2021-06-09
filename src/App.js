import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "./components/Home";
import Station from "./components/Station";
import Error from "./components/Error";

import "./styles.css";
import "./transitions.css";

export default function App() {
  let location = useLocation();
  const history = useHistory();

  return (
    <div className="App">
      <div className="container">
        <div className="animationContainer">
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={{
                enter: 300,
                exit: 0
              }}
              onEnter={() => {
                // Prevents Station page from being scrolled down on opening
                window.scrollTo(0, 0);
              }}
            >
              <Switch location={location}>
                {/*
                    div.page is used for page transition animations
                    Also, it represents a page, which should be used here
                    For assignment purposes Components were used instead,
                    due to the fact that each page has only a single component
                 */}
                <Route exact path="/">
                  <div className="page">
                    <Home />
                  </div>
                </Route>
                <Route path="/station/:id">
                  <div className="page">
                    <Station />
                  </div>
                </Route>
                <Route>
                  <div className="page">
                    <Error
                      text="404! This page does not exist"
                      action={() => history.replace('/')}
                      actionText="Go To Homepage"
                    />
                  </div>
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}
