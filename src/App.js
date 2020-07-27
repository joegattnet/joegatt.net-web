import React from "react";
// import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Footer from "./components/Footer";

import Api from "./pages/Api";
import Citation from "./pages/Citation";
import Citations from "./pages/Citations";
import Feature from "./pages/Feature";
import Home from "./pages/Home";
import Links from "./pages/Links";
import Login from "./pages/Login";
import LoginToolbar from "./pages/LoginToolbar";
import Register from "./pages/Register";
import Tags from "./pages/Tags";
import Text from "./pages/Text";
import Texts from "./pages/Texts";

import { UserContext, UserContextProvider } from "./helpers/UserContext";

import {
  BLACK,
  BLUE,
  CONTENT_COLUMNS_SPAN,
  CONTENT_COLUMNS_START,
  DESKTOP_BREAKPOINT,
  LINE_HEIGHT,
  PAGE_COLUMNS_SPAN,
  RED,
  SANS_FONT_SIZE,
  TAB_WIDTH,
  TITLE_FONT_SIZE,
  TITLE_LINE_HEIGHT,
  WHITE,
  YELLOW,
} from "./variables";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    height: 100.1%;
  }
  body {
    background-color: ${WHITE};
    color: ${BLACK};
    font-family: 'Lato', sans-serif;
    /* font-family: 'Roboto', sans-serif; */
    font-size: ${SANS_FONT_SIZE};
    line-height: ${LINE_HEIGHT};
  }
  #app {
    min-height: 100%;
    min-width: 100%;
  }
  h2 {
    color: ${RED};
    font-size: ${TITLE_FONT_SIZE};
    line-height: ${TITLE_LINE_HEIGHT};
  }
  h3 {
    display: none;
  }
  a {
    color: ${BLACK};
    text-decoration: none;
    &:hover {
      color: ${RED};
    }
    &[href*=//]:hover {
      color: ${BLUE};
    }
  }
  ol,
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .count {
    color: ${RED};
  }
  ::selection {
    background: ${YELLOW};
    text-shadow: none;
  }
`;

const StyledPage = styled.div`
  ${"" /* font-family: 'Roboto', sans-serif; */}
  font-family: 'Lato', sans-serif;
  padding: 0 ${TAB_WIDTH} ${LINE_HEIGHT};

  @media screen and (min-width: ${DESKTOP_BREAKPOINT}) {
    display: grid;
    grid-column-gap: ${TAB_WIDTH};
    grid-template-columns: repeat(${PAGE_COLUMNS_SPAN}, 1fr);
  }

  #content {
    grid-column-end: span ${CONTENT_COLUMNS_SPAN};
    grid-column-start: ${CONTENT_COLUMNS_START};
    margin-bottom: ${LINE_HEIGHT};
  }
`;

// const App: React.FunctionComponent<RouteComponentProps> = () => (
const App = () => (
  <StyledPage className="App">
    <GlobalStyles />
    <UserContextProvider>
      <section id="content">
        <Switch>
          <Route exact path="/api" component={Api} />
          <Route path="/citations/:id" component={Citation} />
          <Route exact path="/citations" component={Citations} />
          <Route path="/texts/:id" component={Text} />
          <Route exact path="/tags" component={Tags} />
          <Route exact path="/texts" component={Texts} />
          <Route exact path="/links" component={Links} />
          <Route exact path="/user/register" component={Register} />
          <Route exact path="/:feature/:featureId" component={Feature} />
          <Route exact path="/:feature" component={Feature} />
          <Route exact path="/" component={Home} />
        </Switch>
      </section>
      <Footer />
      <UserContext.Consumer>
        {({ user }) => (user.signedIn ? <LoginToolbar /> : <Login />)}
      </UserContext.Consumer>
    </UserContextProvider>
  </StyledPage>
);

export default App;
