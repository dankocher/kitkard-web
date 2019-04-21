import React from 'react';
import {connect} from "react-redux";
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Touchable from 'react-native-platform-touchable';
// import {ListItem} from "react-native-elements";

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
        /*await this.setState(previousState => {
            return {is_private: !previousState.is_private}
        });
        this.card.is_private = this.state.is_private;
        this.props.dispatch(saveCard(this.card));*/
        RightViewNavigator(
            <EditTextView username={this.props.user.username} __props={{...this.props, ...{onChangeValue: this.onChangeValue}}}/>
        );
        // TODO: navigation
        // this.props.navigation.navigate("NoAnimationNavigator", {
        //     title: translate[this.props.language][this.props.type],
        //     view: this.props.type,
        //     cardname: this.props.cardname
        // })
    };

    onChangeValue = (value) => {
         this.setState({value});
    };

    render() {
        const color = colors[this.props.theme];
        const t = translate[this.props.language];

        const card = this.props.cards[this.props.cardname];
        console.log(this.props);

        return (
            <TouchableOpacity style={[styles.container, {borderColor: color.border }]}
                       activeOpacity={0.8}
                       onPress={() => this.editText()}>
                <View style={styles.data}>
                    <Text style={[styles.name, { color: color.textSoft }]}>
                        {card[this.props.type]}
                    </Text>
                    <Text style={[styles.value, { color: color.text}]}>
                        {this.state.value}
                    </Text>
                </View>
                {/*<ListItem*/}
                    {/*style={{borderBottomWidth: 0}}*/}
                    {/*title={t[this.props.type]}*/}
                    {/*subtitle={card[this.props.type]}*/}
                    {/*titleStyle={[styles.name, { color: color.textSoft }]}*/}
                    {/*subtitleStyle={[styles.value, {color: color.text}]}*/}
                    {/*containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}}*/}
                    {/*hideChevron*/}
                    {/*noBorder={true}*/}
                {/*/>*/}
            </TouchableOpacity>
        );
    }
};
export default EditText;
/*
const mapStateToProps = state => {
    return {
        user: state.user,
        cards: state.cards,
        language: state.language,
        theme: state.theme
    }
};
export default connect(mapStateToProps)(EditText)
*/
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
