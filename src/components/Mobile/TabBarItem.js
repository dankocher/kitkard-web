import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

import {connect} from "react-redux";
import {setTheme} from "../../redux/actions";
import colors from "../../constants/colors";
import KitIcon from "../KitIcon";

import '../../styles/TabBarItem.scss';
import {Link} from "react-router-dom";

class TabBarItem extends Component {

    render() {
        const {theme, icon, selected, selectedCard} = this.props;
        const color = colors[theme];

        const path = icon === "my_cards" ? (selectedCard === null ? "" : "+"+selectedCard) : icon;

        return (
            <Flex.Item className="tabBar-item" style={{backgroundColor: color.tabBar}}>
                <Link to={`/${path}`} className={'item-button'} onClick={() => this.props.onSelect(icon)}>
                    <KitIcon name={icon} color={selected ? color.primary : color.icon} size={25} />
                </Link>
            </Flex.Item>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    selectedCard: state.selectedCard,
});

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBarItem)
/*
const styles = StyleSheet.create({
    item: {
        flex: 1,
        height: "100%",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: "100%",
        height: "100%",
    },
    buttonContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
*/