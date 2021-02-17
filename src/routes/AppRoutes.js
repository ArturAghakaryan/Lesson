import React from 'react'
import {Route, Switch } from "react-router-dom";

import HomePage from "containers/Pages/HomePage/HomePage";
import Posts from "containers/Pages/Posts/Posts";
import PostDetails from 'containers/Details/PostDetails/PostDetails';
import Todos from "containers/Pages/Todos/Todos";

const AppRoutes = () => {
    return (
        <>
         <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/:postId" component={PostDetails} />
            <Route exact path="/todos" component={Todos} />
            <Route path="*" component={HomePage} />
          </Switch>
        </>
    )
}

export default AppRoutes
