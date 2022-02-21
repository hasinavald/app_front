import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import LoginFront from "./components/front/loginFront.component";
import SignUp from "./components/signup.component";
import AddUSers from "./components/AddUsers.component.js";
import GestionUsers from "./components/GestionUsers.component";
import Dashboard from "./components/Dashboard.component";
import Region from "./components/Region.component";
import EditRegion from "./components/EditRegion.component";
import AddRegion from "./components/AddRegion.component";
import EditUSers from "./components/EditUSers.component";
import TypeSignalement from "./components/TypeSignalement.component";
import EditTypeSignalement from "./components/EditTypeSignalement.component";
import GererSignalement from "./components/GererSignalement.component";
import GererSignalementFront from "./components/front/GererSignalementFront.component";
import EditSignalement from "./components/EditSignalement.component";
import EditSignalementFront from "./components/front/EditSignalementFront.component";
import AddTypeSignalement from "./components/AddTypeSignalement.component";
import DashboardFront from "./components/front/DashboardFront.component";
// import MyComponent from "./components/MapGoogle";
import {connect} from 'react-redux';

function App(props) {
  const stores = props;
  return (<Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/front/login' component={LoginFront} />
            <Route exact path='/admin' component={Login} />
            {/* <Route exact path='/googlemap' component={MyComponent} /> */}
            <Route exact path='/sign-up' component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/add-users" component={AddUSers} />
            <Route path="/edit-user" component={EditUSers} />
            <Route path="/gestion-users" component={GestionUsers} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/gestion-region" component={Region} />
            <Route path="/gerer-type-signalement" component={TypeSignalement} />
            <Route path="/edit-region" component={EditRegion} />
            <Route path="/add-region" component={AddRegion} />
            <Route path="/edit-type-signalement" component={EditTypeSignalement} />
            <Route path="/add-type-signalement" component={AddTypeSignalement} />
            <Route path="/gerer-signalement" component={GererSignalement} />
            <Route path="/gerer-signalement-front" component={GererSignalementFront} />
            <Route path="/edit-signalement" component={EditSignalement} />
            <Route path="/edit-signalement-front" component={EditSignalementFront} />
            <Route path="/dashboard-front" component={DashboardFront} />
          </Switch>
    </div></Router>
  );
}
const states = (state) => {
  return {
    isAuth : state.isAuth
  }
}
const setAuth = (dispatch) => {
  return {
    setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})}
  } 
}
export default connect(states)(App);
