import React from 'react';
import {StyleSheet, Text, View, Image, Linking, Platform, Alert, Clipboard, TouchableOpacity } from 'react-native';
// import Touchable from 'react-native-platform-touchable';
import { connect } from 'react-redux';

import colors from '../../constants/colors';
import CONTACTS from "../../constants/contacts";
import translate from "../../translations";
import { phone, website, email, address, whatsapp, viber, telegram, skype, fb_messenger, hangouts, wechat, instagram, twitter, facebook, pinterest, tumblr, linkedin, snapchat, vk, odnoklassniki, flickr, myspace, livejournal, icq, sms } from "../../helpers/RunApps";
// import { Toast } from "@ant-design/react-native";

class ContactView extends React.Component {

    getUri() {
        const {contact} = this.props;
        switch (contact.type) {
            case "phone": return phone(contact.value);
            case "website": return website(contact.value);
            case "email": return email(contact.value);
            case "address": return address(contact.value);
            case "whatsapp": return whatsapp(contact.value);
            case "viber": return viber(contact.value);
            case "telegram": return telegram(contact.value);
            case "skype": return skype(contact.value);
            case "fb_messenger": return fb_messenger(contact.value);
            case "hangouts": return hangouts(contact.value);
            case "wechat": return wechat(contact.value);
            case "instagram": return instagram(contact.value);
            case "twitter": return twitter(contact.value);
            case "facebook": return facebook(contact.value);
            case "pinterest": return pinterest(contact.value);
            case "tumblr": return tumblr(contact.value);
            case "linkedin": return linkedin(contact.value);
            case "snapchat": return snapchat(contact.value);
            case "vk": return vk(contact.value);
            case "odnoklassniki": return odnoklassniki(contact.value);
            case "flickr": return flickr(contact.value);
            case "myspace": return myspace(contact.value);
            case "livejournal": return livejournal(contact.value);
            case "icq": return icq(contact.value);
            case "sms": return sms(contact.value);

            default: return 'text'; //TODO: show text
        }
    }

    onContactPress = () => {
        const {contact} = this.props;
        if (contact.type === "kitkard") {
            //TODO: Open card
        } else {
            const uri = this.getUri();

            setTimeout(() => {
                Linking.canOpenURL(uri)
                    .then(supported => {
                        if (!supported) {
                            Alert.alert('Error to open contact');
                        } else {
                            return Linking.openURL(uri);
                        }
                    })
                    .catch(err => console.log(err));
            }, 500)
        }

    };

    copyContact = async () => {
        const t = translate[this.props.language];
        await Clipboard.setString(this.props.contact.value);
        // Toast.info(t.contact_copied, 1, undefined, false);
    };

    render() {
        const {contact, language} = this.props;
        const color = colors[this.props.theme];
        const t = translate[language];

        if (contact === undefined) {
            return null;
        } else
        return (
            <TouchableOpacity onPress={() => this.onContactPress()} onLongPress={() => this.copyContact()} delayLongPress={1000}>
                <View style={styles.container}>
                    <Image style={styles.icon} source={CONTACTS[contact.type].icon}/>
                    <View style={styles.data}>
                        <Text style={[styles.name, {color: color.text, height: contact.name === "" ? 0 : 12}]}>
                            {contact.name === contact.type ? t['contact_'+contact.type] : contact.name}
                        </Text>
                        <Text style={[styles.value, {color: color.text}]}>{(CONTACTS[contact.type].short_prefix || "") + contact.value}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
        theme: state.theme,
        language: state.language,
        cards: state.cards,
    }
};
export default connect(mapStateToProps)(ContactView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 15,
    },
    data: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 9,
        opacity: 0.7
    },
    value: {
        fontSize: 14,
        justifyContent: 'flex-start',
        paddingRight: 10
    }
});

// export const CardView = generateCardView()
