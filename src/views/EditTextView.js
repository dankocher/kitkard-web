import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import colors from "../constants/colors";
import Header from "../components/Mobile/Header";
import {withStyles} from "@material-ui/core";
import translate, {getText} from "../translations";

class EditTextView extends Component {

    constructor(props) {
        super(props);

        this.__props  = props.__props;
        this.theme = colors[this.__props.theme];
        this.cardname = props.__props.cardname;
        this.card = props.__props.card;
        this.state = {
            showView: false,
            value: ""
        };
    }

    componentDidMount() {
        const card = this.__props.cards[this.cardname];
        this.originalValue = card[this.__props.type].toString();
        this.setState({value: card[this.__props.type]});
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

    close = () => {
        this.setState({showView: false});

        if (this.originalValue !== this.state.value) {
            const card = this.__props.cards[this.__props.cardname];
            this.__props.onChangeValue(this.state.value);
            this.__props.saveCard({
                ...card,
                [this.__props.type]: this.state.value,
                updated: new Date().getTime()
            });
        }

        setTimeout(() => {
            let node = document.getElementById(this.props.id);
            node.parentNode.removeChild(node);
        }, 1000);
    };

    render() {
        const {classes} = this.props;

        const t = translate[this.__props.language];

        return (
            <div className={`${classes.container} ${this.state.showView ? classes.show : classes.hide}`} style={{backgroundColor: this.theme.primary}}>
                <Header
                    onBack={this.close}
                    leftComponent={
                        <div className={classes.title}>
                            {getText(t, this.__props.type)}
                        </div>
                    }
                />
                <div className={classes.viewContent} style={{backgroundColor: this.theme.background}}>
                <TextInput
                    ref={input => this.__input = input}
                    style={[styles.textInput, {color: this.theme.text}]}
                    maxLength={50}
                    onChangeText={value => this.onChangeValue(value)}
                    value={this.state.value}
                    autoFocus={true}
                    autoCapitalize={this.__props.type === "name" ? "words" : "sentences"}
                    autoCorrect={true}
                />
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
        left: '150%'
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


EditTextView = withStyles(__styles, {name: 'EditTextView', withTheme: true})(EditTextView);

export default EditTextView;


const styles = StyleSheet.create({

    textInput: {
        // height: 40,
        // paddingTop: 15,
        paddingBottom: 5,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.primary,
        margin: 15
    },
});

