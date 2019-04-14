import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import { connect } from 'react-redux';

import translate from '../../translations';
import colors from '../../constants/colors';
import {Switch} from "antd-mobile";

class EditPrivate extends React.Component {

    constructor(props) {
        super(props);
        this.cardname = props.cardname;
        const card = props.cards[props.cardname];
        this.state = {
            is_private: (card.is_private || card.is_private === 1)
        }
    }

    togglePrivate = async() => {
        await this.setState(previousState => {
            return {is_private: !previousState.is_private}
        });
        const card = this.props.cards[this.cardname];
        card.is_private = this.state.is_private;
        card.updated = new Date().getTime();
        this.props.saveCard(card);
    };

    render() {

        const color = colors[this.props.theme];
        const t = translate[this.props.language];

        return (

            <View style={[styles.container, {borderColor: color.border }]}>
                <TouchableOpacity
                    onPress={() => this.togglePrivate()}
                    style={[styles.button, { backgroundColor: color.background }]}>
                    <Text style={{color: color.text, fontSize: 16, marginLeft: 10, flex: 1}}>
                        { this.state.is_private ? t.private_card : t.public_card }
                    </Text>
                    <Switch checked={this.state.is_private} onChange={() => this.togglePrivate()} color={color.primary}/>
                </TouchableOpacity>
            </View>
        );
    }
}

export default EditPrivate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 1
    },
    button: {
        flex: 1,
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row'
    },
    text: {

    }

});
