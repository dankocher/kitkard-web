import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import AppNavigator from "./AppNavigator";
import UnderConstruction from "../screens/UnderConstruction";
import Document from "../screens/Document";

function AppRouter() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} screen={"my_cards"} className={"router"}/>
                <Route exact path="/+:cardname" component={Home} screen={"my_cards"} className={"router"}/>
                <Route exact path="/my_cards" component={Home} screen={"my_cards"} className={"router"}/>
                <Route exact path="/settings" component={Home} screen={"settings"} className={"router"}/>
                <Route exact path="/notifications" component={Home} screen={"notifications"} className={"router"}/>
                <Route exact path="/search" component={Home} screen={"search"} className={"router"}/>
                <Route exact path="/cardholder" component={Home} screen={"cardholder"} className={"router"}/>

                <Route path="/help" component={Help} />
                <Route path="/about" component={About} />
                <Route path="/policy" component={Policy} />
                <Route path="/terms" component={Terms} />
                <Route path="/conditions" component={Conditions} />
                <Route path="*" render={() => (<Redirect to="/" />)} />
                {/*<Route path="*" component={NoMatch} />*/}
            </Switch>
        </BrowserRouter>
    );
}


const UNDER_CONSTRUCTION = true;

function Home() {

    // return <AppNavigator className='full-size'/>;
    if (!UNDER_CONSTRUCTION) {
        return <AppNavigator className='full-size' screen={this.props.screen}/>;
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