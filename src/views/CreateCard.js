import React from 'react';
// import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { Modal, ActivityIndicator, Button } from 'antd-mobile';
// import Spinner from 'react-native-loading-spinner-overlay';
// import Touchable from 'react-native-platform-touchable';
import { connect } from 'react-redux';
import {addUserCard, saveCard, selectCard} from "../redux/actions";
import translate from "../translations";
import colors from "../constants/colors";
import ajax from "../utils/ajax";
import {api} from "../constants/api";

import '../styles/CreateCard.scss';
import AspectRatio from "../components/AspectRatio";

class CreateCard extends React.Component {

    constructor(props) {
        super(props);

        this.flip = props.flip;
        this.share = props.share;
        this.state = {
            cardname: "",
            enabled: false,
            spinner: false
        }
    }

    setCardname = async (cardname) => {
        await this.setState({
            cardname: cardname.replace(/[^0-9a-zA-Z_.]/gi, "").replace(/\.+/gi, ".").replace(/_+/gi, "_").replace(/^[0-9]/, "")
        });
        this.setState({
            enabled: this.cardNameIsValid(this.state.cardname)
        })
    };

    cardNameIsValid(username) {
        if (username === "" || username == null || username.length < 5 || username.length > 25 ||
            username.match(/^[0-9]/) ) {
            return false;
        }
        return !!username.match(/^[a-zA-Z0-9._]*$/);
    };

    createCard = async () => {
        if (this.cardNameIsValid(this.state.cardname)) {
            this.setState({ spinner: true, enabled: false });
            const res = await ajax(api.create_card, {
                cardname: this.state.cardname
            });

            if (res.ok) {
                await this.props.saveCard(res.card);
                await this.props.addUserCard(res.card.cardname);
                this.props.selectCard(res.card.cardname);
                this.setState({ spinner: false });
                if (this.props.onCancel !== undefined) {
                    this.props.onCancel();
                }
            } else {
                const t = translate[this.props.language];
                if (res.status === "exist") {
                    Modal.alert(null, t.card_exist, [ { text: t.ok, onPress: () => {return false;}, style: 'cancel' }] )
                } else {
                    this.setState({ enabled: true });
                }
                this.setState({ spinner: false });
            }
        }
    };

    render() {
        const {theme, language, user} = this.props;
        const t = translate[language];
        const color = colors[theme];

        const isFirst = user.cards === undefined || user.cards.length === 0;
        return (
            <div className='create-card' style={{backgroundColor: color.primary}}>
                <ActivityIndicator
                    toast
                    animating={this.state.spinner}
                />
                <AspectRatio widthRatio={17} heightRatio={27}>
                    <div className='card' style={{backgroundColor: color.card}}>
                        <div className='header' style={{color: color.text}}>
                            {isFirst ? t["first_cardname"] : t["add_cardname"]}
                        </div>
                        <div className='cardname_description' style={{color: color.text}}>
                            {isFirst ? t["first_new_cardname"] : t["new_cardname"]}
                        </div>
                        <input className='cardname' style={{color: color.text, backgroundColor: color.textInputBg}}
                                   value={"+"+this.state.cardname}
                                   onChange={(evt) => this.setCardname(evt.target.value)}
                                   autoCapitalize='none'
                                   maxLength={26}
                        />
                        <button
                            className='buttonRegister'
                            disabled={!this.state.enabled}
                            onClick={this.createCard}>
                            <span className={'submitText'}>{t["create_card"]}</span>
                        </button>
                        <CancelButton hidden={isFirst} onCancel={() => this.props.onCancel()} t={t}/>

                    </div>
                </AspectRatio>
            </div>
        );
    }
}

const CancelButton = props => {
    const {hidden, onCancel, t} = props;

    if (hidden) {
        return null;
    } else {
        return (
            <Button
                className='buttonCancel'
                hide={true}
                onClick={onCancel}>
                <span className={'submitText'}>{t["cancel"]}</span>
            </Button>
        )
    }
};

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme,
        user: state.user,
        cards: state.cards,
    }
};
const mapDispatchToProps = dispatch => ({
    addUserCard: cardname => dispatch(addUserCard(cardname)),
    saveCard: card => dispatch(saveCard(card)),
    selectCard: cardname => dispatch(selectCard(cardname)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateCard)

