import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import colors from "../../constants/colors";
import translate from "../../translations";
import RightViewNavigator from "../../views/RightViewNavigator";
import EditTextView from "../../views/EditTextView";

class EditText extends React.Component {

    state = {
        value: ""
    };

    componentWillMount() {
        const card = this.props.cards[this.props.cardname];
        this.setState({value: card[this.props.type]});
    }

    editText = async() => {
        RightViewNavigator(
            <EditTextView username={this.props.user.username} __props={{...this.props, ...{onChangeValue: this.onChangeValue}}}/>
        );

    };

    onChangeValue = (value) => {
         this.setState({value});
    };

    render() {
        const color = colors[this.props.theme];
        const t = translate[this.props.language];

        return (
            <TouchableOpacity style={[styles.container, {borderColor: color.border }]}
                       activeOpacity={0.8}
                       onPress={() => this.editText()}>
                <View style={styles.data}>
                    <Text style={[styles.name, { color: color.textSoft }]}>
                        {t[this.props.type]}
                    </Text>
                    <Text style={[styles.value, { color: color.text}]}>
                        {this.state.value}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
};
export default EditText;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 50,
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    data: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center'
    },
    name: {
        fontSize: 9,
    },
    value: {
        fontSize: 16,
        alignSelf: 'flex-start',

    },
});
