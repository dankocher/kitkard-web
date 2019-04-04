import React, { Component } from 'react';
import {connect} from "react-redux";

import UnderConstruction from 'detect-browser-language';

import './App.css';
import Kitkard from "./Kitkard";
import detectBrowserLanguage from "detect-browser-language";
import {setLanguage} from "./redux/actions";
require('./styles/app.scss');

const UNDER_CONSTRUCTION = false;

class App extends Component {

    componentDidMount() {
        if (this.props.language === "none") {
            let language = detectBrowserLanguage();
            language = language.split("-")[0];
            switch (language) {
                case "ru": case "es": case "en": break;
                default: language = 'en'; break;
            }
            this.props.setLanguage(language);
        }
    }

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
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    setLanguage: language => dispatch(setLanguage(language)),

});

export default connect( mapStateToProps, mapDispatchToProps )(App)