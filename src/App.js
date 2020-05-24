import React from "react";
import { Route, Switch } from "react-router-dom";
import Movies from "./components/movies/Movies";
import Subscriptions from "./components/subscriptions/Subscriptions";
import Users from "./components/users/Users";
import Header from "./components/common/Header";
import PageNotFound from "./components/common/PageNotFound";
import ManageAddMovie from "./components/movies/ManageAddMovie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageAddUser from "./components/users/ManageAddUser";

function App() {
  return (
    <div className="container-fluid">
      <h1>Movies and Subscriptions CMS</h1>
      <Header />
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movie" component={ManageAddMovie} />
        <Route exact path="/movie/:slug" component={ManageAddMovie} />
        <Route exact path="/subscriptions" component={Subscriptions} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user" component={ManageAddUser} />
        <Route exact path="/user/:slug" component={ManageAddUser} />

        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={2500} hideProgressBar />
    </div>
  );
}

export default App;
