import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

import {connect} from "react-redux";
import {setScreen} from "../../redux/actions";
import colors from "../../constants/colors";
import TabBarItem from "./TabBarItem";
import "../../styles/TabBar.scss";

class TabBar extends Component {

    select = async item => {
        if(this.props.screen !== item) {
            await this.props.setTabBarItem(item);
            switch (item) {
                case "settings":
                    console.log('Settings');
                    break;
                case "notifications":
                    console.log('Notifications');
                    break;
                case "search":
                    console.log('Search');
                    break;
                case "cardholder":
                    console.log('Cardholder');
                    break;
                default: case "my_cards":
                    console.log('Home');
                    break;

            }
        }
    };

    render() {
        const {theme, screen} = this.props;
        const color = colors[theme];

        return (
            <Flex className={"tabBar"} style={{backgroundColor: color.tabBar}}>
                <TabBarItem icon="settings" selected={screen === "settings"} onSelect={item => this.select(item)}/>
                <TabBarItem icon="notifications" selected={screen === "notifications"} onSelect={item => this.select(item)}/>
                <TabBarItem icon="my_cards" selected={screen === "my_cards"} onSelect={item => this.select(item)}/>
                <TabBarItem icon="search" selected={screen === "search"} onSelect={item => this.select(item)}/>
                <TabBarItem icon="cardholder" selected={screen === "cardholder"} onSelect={item => this.select(item)}/>
            </Flex>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    screen: state.screen,
});

const mapDispatchToProps = dispatch => ({
    setTabBarItem: screen => dispatch(setScreen(screen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBar)
