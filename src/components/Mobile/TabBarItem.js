import React, { Component, Fragment } from 'react';
// import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile';

import {connect} from "react-redux";
import {setTheme} from "../../redux/actions";
import colors from "../../constants/colors";
// import {KitIcon} from "../KitIcon";
import styles from "../../styles/TabBarItem.scss";

class TabBarItem extends Component {

    render() {
        const {theme, icon, selected} = this.props;
        const color = colors[theme];

        return (
            <Flex.Item style={[styles.item, {backgroundColor: color.tabBar}]}>

                {/*<TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => this.props.onSelect(icon)}>*/}
                    {/*<Flex style={styles.buttonContent}>*/}
                        {/*a*/}
                        {/*/!*<KitIcon name={icon} color={selected ? color.primary : color.icon} size={25}/>*!/*/}
                    {/*</Flex>*/}
                {/*</TouchableOpacity>*/}
            </Flex.Item>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
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