import React from 'react';
import {Text, View, StyleSheet, Platform, FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
// import Modal from "react-native-modal";
import {Modal} from 'antd-mobile';
// import ExtraDimensions from 'react-native-extra-dimensions-android';
// import Touchable from 'react-native-platform-touchable';
// import { connect } from 'react-redux';
import { connect } from 'react-redux';

import colors from '../constants/colors';
import translate from '../translations';

import CONTACTS, {contactsList} from '../constants/contacts'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
// const deviceHeight = Platform.OS === "ios"
//     ? Dimensions.get("window").height
//     : ExtraDimensions.get('REAL_WINDOW_HEIGHT');
class ContactsListModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }
    renderSeparator() {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor:  colors[this.props.theme].cardLines,
                    marginLeft: "0%"
                }}
            />
        );
    };

    close() {
        this.props.onCancel();
    };

    select = (item) => {
        this.props.onSelect(item);
        this.props.onCancel();
    };

    renderContact = (item) => {
        const color = colors[this.props.theme];
        const t = translate[this.props.language];
        const contact = CONTACTS[item];
        return (
            <TouchableOpacity
                onPress={() => this.select(item)}
            >
                <View style={[styles.item]}>
                    <Image style={styles.icon} source={contact.icon}/>
                    <Text style={[styles.text, {color: color.text}]}>{t["contact_"+contact.name]}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const color = colors[this.props.theme];
        const t = translate[this.props.language];
        return (
            <Modal
                popup
                transparent
                visible={this.props.addContactsVisible}
                onClose={() => this.close()}
                animationType="slide-up"
                afterClose={() => { console.log('afterClose'); }}
                className={'modal-add-contact'}
            >
                <View style={[styles.modalContainer]}>
                    <View style={[styles.contactsContainer, {backgroundColor: color.background}]}>
                        <FlatList
                            style={{backgroundColor: color.background}}
                            data={contactsList}
                            renderItem={({item}) => this.renderContact(item)}
                            keyExtractor={item => `${item}`}
                            ItemSeparatorComponent={() => this.renderSeparator()}
                        />
                    </View>

                    <TouchableOpacity style={[styles.cancel, {backgroundColor: color.background}]}
                               onPress={() => this.close()}>
                        <Text style={{fontSize: 18, color: color.text}}>{t['cancel']}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}
/*
const mapStateToProps = state => {
    return {
        user: state.user,
        language: state.language,
        theme: state.theme
    }
};
export default connect(mapStateToProps)(ContactsListModal);
*/

export default ContactsListModal;

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        maxHeight: deviceHeight
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: deviceHeight
    },
    contactsContainer: {
        width: '90%',
        height: deviceHeight - 120,
        maxWidth: 350,
        // shadowColor: 'rgba(0,0,0,0.5)',
        // shadowOffset: {
        //     width: 0,
        //     height: 1
        // },
        // shadowOpacity: 0.8,
        // elevation: 6,
        borderRadius: 15,
        overflow: 'hidden'
    },
    item: {
        flexDirection: 'row',
        padding: 10
    },
    icon: {
        width: 35,
        height: 35
    },
    text: {
        marginLeft: 10,
        flex: 1,
        alignSelf: 'center'
    },
    cancel: {
        width: '90%',
        height: 45,
        marginTop: 15,
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.8,
        elevation: 6,
        borderRadius: 15
    }
});


