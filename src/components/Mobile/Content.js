import React, { Component } from 'react';

import '../../styles/MobileContent.scss';
import {setScreen} from "../../redux/actions";
import connect from "react-redux/es/connect/connect";

import Settings from "../../screens/Settings";

class Content extends Component {

    componentWillMount() {
        this.props.setScreen("settings")
    }

    getScreen = () => {
        switch(this.props.screen) {
            case 'settings': return <Settings/>;
            case 'notifications': return <div>Notifications</div>;
            case 'my_cards': return <div>My Cards</div>;
            case 'search': return <div>Search</div>;
            case 'cardholder': return <div>Cardholder</div>;
            default: return null;
        }
    };

    render() {
        return (
            <div className={"content"}>
                {this.getScreen()}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme,
    screen: state.screen,
});

const mapDispatchToProps = dispatch => ({
    setScreen: screen => dispatch(setScreen(screen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)

