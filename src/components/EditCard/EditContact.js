import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
// import Touchable from 'react-native-platform-touchable';
// import { connect } from 'react-redux';

import colors from '../../constants/colors';
import {KitIcon} from '../../components/KitIcon';
import CONTACTS from "../../constants/contacts";
import translate, {tr} from "../../translations";
import RightViewNavigator from "../../views/RightViewNavigator";
import EditTextView from "./EditText";
import EditContactView from "../../views/EditContactView";
// import {saveCard} from "../../redux/actions";

class EditContact extends React.Component {

    constructor(props) {
        super(props);
        this.card = props.card;

        this.state = {
            value: this.props.contact.value,
            name: this.props.contact.name
        }
    }

    editContact = async() => {
        RightViewNavigator(
            <EditContactView username={this.props.user.username} __props={{
                ...this.props,
                onChangeValue: this.onChangeValue,
                contactId: this.props.contact.id,
                cardname: this.card.cardname
            }}/>
        );
        // this.props.navigation.navigate("NoAnimationNavigator", {
        //     view: "contact",
        //     title: translate[this.props.language]["contact_"+this.props.contact.type],
        //     contactId: this.props.contact.id,
        //     cardname: this.card.cardname
        // })
    };
    onChangeValue = (name, value) => {
        this.setState({name, value});
    };

    deleteContact = async() => {
        const {contact, card} = this.props;
        const id = contact.id;
        card.contacts.ids.splice(card.contacts.ids.indexOf(id), 1);
        delete card.contacts.byId[id];
        card.updated = new Date().getTime();
        await this.props.saveCard(card);
    };

    attemptDeleteContact = async() => {
        const t = translate[this.props.language];
        const {contact} = this.props;
        Alert.alert( null, tr(t.delete_contact_confirmation, {contact: (t["contact_"+contact.type] + ": " + contact.value)}),
            [
                {text: t.no, style: 'cancel'},
                {text: t.yes, onPress: () => this.deleteContact()},
            ],
            { cancelable: false }
        )
    };

    togglePrivate = () => {
        const {contact, card} = this.props;
        const id = contact.id;
        card.contacts.byId[id].is_private = !card.contacts.byId[id].is_private;
        card.updated = new Date().getTime();
        this.props.saveCard(card);
    };

    render() {
        const {move, moveEnd, isActive, theme, language, contact} = this.props;
        const color = colors[theme];
        const t = translate[language];

        return (
            <TouchableOpacity style={[styles.button, {backgroundColor: color.background, borderColor: color.border, opacity: isActive ? 0.8 : 1}]}
                       activeOpacity={0.8}
                       onPress={this.editContact}
                       onLongPress={move}
                       onPressOut={moveEnd}
                >
                <View style={[styles.container]}>
                    <TouchableOpacity style={[styles.buttonAction, {paddingLeft: 8}]}
                        onPress={() => this.attemptDeleteContact()}>
                        <KitIcon name={'remove_circle'} size={25} color={'red'}/>
                    </TouchableOpacity>
                    <View style={styles.dataContainer}>
                        <Image style={styles.icon} source={CONTACTS[contact.type].icon}/>
                        <View style={styles.data}>
                            <Text style={[styles.name, { color: color.textSoft, height: contact.name === "" ? 0 : 12 }]}>
                                {this.state.name === contact.type ? t['contact_'+contact.type] : this.state.name}
                            </Text>
                            <Text style={[styles.value, { color: color.textSoft }]}>{(CONTACTS[contact.type].short_prefix || "") + this.state.value}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.buttonAction, {paddingLeft: 10}]} activeOpacity={0.2} onPress={() => this.togglePrivate()}>
                        <KitIcon name={'private'} size={25} color={contact.is_private ? color.primary : color.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonAction, {paddingLeft: 10}]}
                                      onPressIn={move}
                                      onPressOut={moveEnd}>
                        <KitIcon name={'handle'} size={25} color={color.icon}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}
export default EditContact;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        // height: 50,
        borderBottomWidth: 1,
    },
    container: {
        flex: 1,
        borderBottomWidth: 0,
        flexDirection: 'row',
    },
    buttonAction: {
        width: 40,
        height: 55,
        justifyContent: 'center',
        alignContent: 'center',
    },
    dataContainer: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    data: {
        flex: 1,
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
    icon: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
});
