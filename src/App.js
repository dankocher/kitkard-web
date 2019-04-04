import React, { Component } from 'react';
import {connect} from "react-redux";

import UnderConstruction from './screens/UnderConstruction';

import './App.css';
import Kitkard from "./Kitkard";
require('./styles/app.scss');

const UNDER_CONSTRUCTION = false;

class App extends Component {

    render() {
        return (
            <div className="App">

                {
                    UNDER_CONSTRUCTION ?
                        <UnderConstruction/>
                        :
                        <Kitkard className={"full-size"}/>
                }

            </div>
        );
    }
}

// export default withCookies(App);
const mapStateToProps = state => ({
    // email: state.email,
});

const mapDispatchToProps = dispatch => ({
    // setUser: user => dispatch(setUser(user)),

});

export default connect( mapStateToProps, mapDispatchToProps )(App)