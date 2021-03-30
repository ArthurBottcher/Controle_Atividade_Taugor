import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Login from './views/Login/'
import Register from './views/UserRegister';
import ActivitiesManager from './views/ActivitiesManager/'

export default function MainRoutes(){
    return (
    <Switch>
        <Route path="/" exact>
            <Login/>
        </Route>
        <Route path="/register" exact>
            <Register/>
        </Route>
        <Route path="/activities" exact>
            <ActivitiesManager/>
        </Route>
    </Switch>
    );
}