import React, { Component } from 'react';

import '../../styles/MobileContent.scss';
import {setScreen} from "../../redux/actions";
import connect from "react-redux/es/connect/connect";

import Settings from "../../screens/Settings";
import Home from "../../screens/Home";
import UnderConstruction from "../../screens/UnderConstruction";
import ModalCard from '../../components/ModalCard';

class Content extends Component {

    componentWillMount() {
        // this.props.setScreen("settings")
    }

    getScreen = () => {
        switch(this.props.screen) {
            case 'settings': return <Settings/>;
            case 'notifications': return <UnderConstruction/>;
            case 'my_cards': return <Home/>;
            case 'search': return <UnderConstruction/>;
            case 'cardholder': return <UnderConstruction/>;
            default: return null;
        }
    };

    render() {
        return (
            <div className={"content"}>
                {this.getScreen()}
                <ModalCard/>
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

