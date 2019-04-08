import React from "react";
// import {BrowserRouter, Switch, Route, Redirect,} from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
// import { Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import AppNavigator from "./AppNavigator";
import UnderConstruction from "../screens/UnderConstruction";
import Document from "../screens/Document";

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} screen={"my_cards"} className={"router"}/>
                <Route exact path="/+:cardname" component={Home} screen={"my_cards"} className={"router"}/>
                <Route exact path="/settings" component={Settings} screen={"settings"} className={"router"}/>
                <Route exact path="/notifications" component={Notifications} screen={"notifications"} className={"router"}/>
                <Route exact path="/search" component={Search} screen={"search"} className={"router"}/>
                <Route exact path="/cardholder" component={Cardholder} screen={"cardholder"} className={"router"}/>

                <Route path="/help" component={Help} />
                <Route path="/about" component={About} />
                <Route path="/policy" component={Policy} />
                <Route path="/terms" component={Terms} />
                <Route path="/conditions" component={Conditions} />
                <Route render={() => (<Redirect to="/" />)} />
                {/*<Route path="*" component={NoMatch} />*/}
            </Switch>
        </Router>
    );
}


const UNDER_CONSTRUCTION = false;

function Home(props) {
    if (!UNDER_CONSTRUCTION) {
        return <AppNavigator className='full-size' screen={props.location.path}/>;
    } else {
        return <UnderConstruction/>;
    }
}
function Settings(props) {
    if (!UNDER_CONSTRUCTION) {
        return <AppNavigator className='full-size' screen={props.location.path}/>;
    } else {
        return <UnderConstruction/>;
    }
}
function Notifications(props) {
    if (!UNDER_CONSTRUCTION) {
        return <AppNavigator className='full-size' screen={props.location.path}/>;
    } else {
        return <UnderConstruction/>;
    }
}
function Search(props) {
    if (!UNDER_CONSTRUCTION) {
        return <AppNavigator className='full-size' screen={props.location.path}/>;
    } else {
        return <UnderConstruction/>;
    }
}
function Cardholder(props) {
    if (!UNDER_CONSTRUCTION) {
        return <AppNavigator className='full-size' screen={props.location.path}/>;
    } else {
        return <UnderConstruction/>;
    }
}

function Help() {
    // return <h2>Help</h2>;
    return <Document document={"help"}/>;
}
function About() {
    return <Document document={"about"}/>;
}
function Policy() {
    return <Document document={"policy"}/>;
}
function Terms() {
    return <Document document={"terms"}/>;
}
function Conditions() {
    return <Document document={"conditions"}/>;
}

export default AppRouter;