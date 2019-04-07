import React, {Component} from 'react';
import Adaptive from "../Adaptive";
import {setScreen} from "../redux/actions";
import connect from "react-redux/es/connect/connect";

class AppNavigator extends Component {

    componentDidMount() {
        const location = window.location;
        switch (location.pathname) {
            case "/settings":
                this.props.setScreen("settings");
                break;
            case "/notifications":
                this.props.setScreen("notifications");
                break;
            case "/my_cards":
                this.props.setScreen("my_cards");
                break;
            case "/search":
                this.props.setScreen("search");
                break;
            case "/cardholder":
                this.props.setScreen("cardholder");
                break;
            default:
                if (location.pathname.startsWith("/+")) {
                    this.props.setScreen("my_cards");

                    //TODO: if is my card show it
                    //TODO: if is not my card show card in Modal
                }
                break;

        }
    }

    render() {
        return <Adaptive/>
    }

}

const mapStateToProps = state => ({
    screen: state.screen,
});

const mapDispatchToProps = dispatch => ({
    setScreen: screen => dispatch(setScreen(screen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavigator)
