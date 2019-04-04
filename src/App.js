import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import UnderConstruction from './screens/UnderConstruction';

import './App.css';
require('./styles/app.scss');

const UNDER_CONSTRUCTION = false;

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };


    render() {
        return (
            <div className="App">

                {
                    UNDER_CONSTRUCTION ? <UnderConstruction/> :
                        null
                }

            </div>
        );
    }
}

export default withCookies(App);
