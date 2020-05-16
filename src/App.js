import React from "react";
import { Route, Switch } from "react-router-dom";
import Movies from "./components/movies/Movies";
import Subscriptions from "./components/subscriptions/Subscriptions";
import Users from "./components/users/Users";
import Header from "./components/common/Header";
import PageNotFound from "./components/common/PageNotFound";

function App() {
  return (
    <div className="container-fluid">
      <h1>Movies and Subscriptions CMS</h1>
      <Header />
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route exact path="/subscriptions" component={Subscriptions} />
        <Route exact path="/users" component={Users} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
