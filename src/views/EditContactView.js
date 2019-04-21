import React, { Component } from 'react';
import { View, Image, StyleSheet, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';

import colors from "../constants/colors";
import {saveCard} from "../redux/actions";
import Header from "../components/Mobile/Header";
import KitIcon from "../components/KitIcon";
import {withStyles} from "@material-ui/core";
import translate, {getText} from "../translations";
import CONTACTS from '../constants/contacts'

class EditContactView extends Component {

    constructor(props) {
        super(props);

        this.__props  = props.__props;
        this.theme = colors[this.__props.theme];
        this.cardname = this.__props.cardname;
        this.card = this.__props.card;
        this.contactId = this.__props.contactId;
        const contact = this.card.contacts.byId[this.contactId];

        this.originalName = contact.name;
        this.originalValue = contact.value;

        this.state = {
            showView: false,
            autoComplete: 'off',
            type: contact.type|| "",
            name: contact.name || "",
            value: contact.value || ""
        };
    }

    componentDidMount() {
        // const card = this.__props.cards[this.cardname];
        // this.originalValue = card[this.__props.type].toString();
        // this.setState({value: card[this.__props.type]});
        setTimeout(() => {
            this.setState({showView: true});
            if (this.__input !== undefined) {
                this.__input.focus();
            }
        }, 10);
    }

    onChangeValue = async (value) => {
        await this.setState({ value });
    };
    onChangeName = async (name) => {
        await this.setState({ name });
    };

    close = () => {
        // this.onChange(this.card.updated || this.card.date);
        this.setState({showView: false});

        if (this.originalName !== this.state.name || this.originalValue !== this.state.value) {
            const card = this.__props.cards[this.__props.cardname];
            card.contacts.byId[this.contactId].name = this.state.name;
            card.contacts.byId[this.contactId].value = this.state.value;
            card.updated = new Date().getTime();
            this.__props.saveCard(card);
            this.__props.onChangeValue(this.state.name, this.state.value);
            // saveUserCard(this.props, this.card);
        }

        let autoComplete = 'off';
        switch (this.state.type) {
            case "phone": autoComplete = "tel"; break;
            case "email": autoComplete = "email"; break;
            case "address": autoComplete = "street-address"; break;
            default: autoComplete = "off"; break;
        }

        this.setState({autoComplete: autoComplete});

        setTimeout(() => {
            let node = document.getElementById(this.props.id);
            node.parentNode.removeChild(node);
        }, 1000);
    };

    render() {
        const {classes} = this.props;
        const theme = this.theme;
        const t = translate[this.__props.language];

        return (
            <div className={`${classes.container} ${this.state.showView ? classes.show : classes.hide}`} style={{backgroundColor: this.theme.primary}}>
                <Header
                    onBack={this.close}
                    leftComponent={
                        <div className={classes.title}>
                            {getText(t, "contact_" + this.state.type)}
                        </div>
                    }
                />
                <div className={classes.viewContent} style={{backgroundColor: this.theme.background}}>
                    <View style={styles.topContainer}>
                        <Image style={styles.icon} source={CONTACTS[this.state.type].icon}/>
                        <TextInput
                            style={[styles.textInput, styles.borderBottom, styles.name, {color: theme.text}]}
                            maxLength={50}
                            onChangeText={name => this.onChangeName(name)}
                            value={this.state.name === this.state.type ? t['contact_'+this.state.type] : this.state.name}
                            autoFocus={false}

                        />
                    </View>
                    <View style={[styles.valueContainer, styles.borderBottom]}>
                        <Text style={[styles.prefix, {color: theme.text}]}>{(CONTACTS[this.state.type].prefix || "")}</Text>
                        <TextInput
                            ref={input => this.__input = input}
                            style={[styles.textInput, {color: theme.text}]}
                            multiline={true}
                            onChangeText={value => this.onChangeValue(value)}
                            value={this.state.value}
                            autoFocus={true}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                    </View>
                </div>
            </div>
        );
    }
}

const __styles = theme => ({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 100px 0 rgba(0, 0, 0, 0.5)',
    },
    show: {
        left: 0,
    },
    hide: {
        left: '150%'
    },
    viewContent: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
});


EditContactView = withStyles(__styles, {name: 'EditContactView', withTheme: true})(EditContactView);

export default EditContactView;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: colors.light.primary
    },
    topContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingRight: 5
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
    },
    name: {
        flex: 1,
        paddingBottom: 5,
        marginLeft: 10,
        fontSize: 18
    },
    valueContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginRight: 10,

    },
    prefix: {
        fontSize: 20,
        // paddingTop: 4
        // backgroundColor: 'blue',
    },
    textInput: {
        flex: 1,
        fontSize: 20,
        // marginTop: 5,
        marginRight: 5,
        paddingTop: 0,
        paddingBottom: 5,
        // backgroundColor: 'green'
    },
    borderBottom: {
        borderBottomColor: colors.light.primary,
        borderBottomWidth: 1,
    }
});

