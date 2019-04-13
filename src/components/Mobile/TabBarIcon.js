import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {KitIcon} from '../KitIcon';
import colors from '../../constants/colors.js';
import {createAppContainer} from "react-navigation";
import {connect} from "react-redux";

class TabBarIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newNotif: this.props.notifications.filter(n => n.viewed === false || n.viewed === undefined).length
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            newNotif: nextProps.notifications.filter(n => n.viewed === false || n.viewed === undefined).length
        })
    }


    render() {
        return (
            <View>
                <KitIcon
                    name={this.props.name}
                    size={26}
                    // style={{ marginBottom: -3 }}
                    color={this.props.focused ? colors.light.primary : colors.light.icon }
                />
                {
                    this.props.name === 'notifications' && this.state.newNotif > 0 ?
                    <View style={styles.badge}>
                        <Text style={styles.textBadge}>{this.state.newNotif}</Text>
                    </View>
                        : null
                }
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        notifications: state.notifications
    }
};
export default connect(mapStateToProps)(TabBarIcon)

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        backgroundColor: 'red',
        minWidth: 14,
        height: 14,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        right: -1,
        top: -3
    },
    textBadge: {
        fontSize: 8,
        color: 'white'
    }
});
