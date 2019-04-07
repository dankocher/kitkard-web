import React, { Component } from 'react';
import {connect} from "react-redux";

import UnderConstruction from 'detect-browser-language';

import './App.css';
import Kitkard from "./Adaptive";
import detectBrowserLanguage from "detect-browser-language";
import {setLanguage, setSession, setTheme, setUser} from "./redux/actions";
import getValueOrDefault from "./utils/getValueOrDefault";
import AppRouter from "./navigation/AppRouter";
require('./styles/app.scss');

const UNDER_CONSTRUCTION = false;

class App extends Component {

    componentDidMount() {
        this.getStateFromLS();
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        this.saveStateToLocalStorage();
    }

    saveStateToLocalStorage(){
        this.saveToLocalStorage('language', this.props.language, false);
        this.saveToLocalStorage('theme', this.props.theme, false);
        this.saveToLocalStorage('user', this.props.user, true);
        this.saveToLocalStorage('session', this.props.session, false);
    }

    async getStateFromLS(){

        let language = await localStorage.getItem('language');
        await this.props.setLanguage(getValueOrDefault(language, detectBrowserLanguage().split("-")[0]));

        let theme = await localStorage.getItem('theme');
        await this.props.setTheme(getValueOrDefault(theme, "light"));


        let user = getValueOrDefault(await localStorage.getItem('user'), null);
        if (user !== null) {
            await this.props.setUser(JSON.parse(user));
        }

        let session = await localStorage.getItem('session');
        await this.props.setSession(getValueOrDefault(session, null));


        // await this.props.setUser(JSON.parse(user));
        // await this.props.setSession(session);


    }

    saveToLocalStorage(name, value, isObject){
        if (value == null){
            localStorage.removeItem(name)
        } else {
            value = isObject ? JSON.stringify(value) : value;
            localStorage.setItem(name, value);
        }
    }

    render() {
        return (
            <div className="App">

                {
                    UNDER_CONSTRUCTION ?
                        <UnderConstruction/>
                        :
                        <AppRouter className={'full-size'}/>
                }

                {/*<Kitkard className={"full-size"}/>*/}
            </div>
        );
    }
}

// export default withCookies(App);
const mapStateToProps = state => ({
    language: state.language,
    theme: state.theme,
    user: state.user,
    session: state.session,
});

const mapDispatchToProps = dispatch => ({
    setLanguage: language => dispatch(setLanguage(language)),
    setTheme: theme => dispatch(setTheme(theme)),
    setUser: user => dispatch(setUser(user)),
    setSession: session => dispatch(setSession(session)),

});

export default connect( mapStateToProps, mapDispatchToProps )(App)