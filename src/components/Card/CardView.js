import React, {Component} from 'react';
import {Platform} from 'react-native';
import {withStyles} from "@material-ui/core";
import { selectCard } from "../../redux/actions";
import {connect} from "react-redux";
import SocketIOClient from 'socket.io-client';
import CardFlip from "./CardFlip";

import {api, host} from "../../constants/api";
import {isMyCard} from "../../helpers/isMyCard";
import {getOwnerCardname, isCardholder, isPrivate, isRequested} from "../../helpers/isCardholder";
import ajax from "../../utils/ajax";
import {saveCard, saveFriend, deleteFriend, saveNotification, saveUser, saveCardParams} from "../../redux/actions";
import {syncCard} from "../../helpers/sync";
import {Modal, Toast} from "antd-mobile";
import translate, {getText} from '../../translations';
import {notifyUpdateNotifications} from "../../helpers/notifyUpdateNotifications";
import {notifyUpdateFriends} from "../../helpers/notifyUpdateFriends";
import syncNotifications from "../../helpers/syncNotifications";
import syncFriends from "../../helpers/syncFriends";

import t from '../../translations';

import CardFront from "./CardFront";
import CardBack from "./CardBack";
import syncUser from "../../helpers/syncUser";

class CardView extends Component {

    constructor(props) {
        super(props);

        this.cardname = props.cardname;

        this.state = {
            type: '',
            showAddCard: false,
            card: {
                cardname: props.cardname,
                updated: 0,
            }
        }
    }

    async updateType(props) {
        const {user, cardname} = props;

        if (await isMyCard(props, cardname)) {
            this.setState({type: 'cards'});
        }
        else if(await isCardholder(props, cardname)) {
            this.setState({type: 'cardholder'});
        }
        else if (await isRequested(props, cardname)) {
            this.setState({type: 'requested'});
        }
        /*if(isKeeper(user, card.cardname)) {
            this.setState({type: 'keepers'});
        }*/ else if(await isPrivate(props, cardname)) {
            this.setState({type: 'private'});
        } else {
            this.setState({type: 'public'});
        }

    }

    componentWillReceiveProps(newProps) {
        this.updateCard(newProps);
        // this.updateType(newProps);
    }
    async updateCard(newProps) {
        if (newProps === undefined) newProps = this.props;
        if  (newProps[this.cardname] !== undefined) {
            await this.setState({card: newProps.cards[this.cardname]});
        }
        this.updateType(newProps);
    }

    componentWillMount() {
        const {cardname} = this.props;
        // syncCard(this.props, card);
        this.updateType(this.props);
        this.startSocket();
    }
    componentDidMount() {
        // syncCard(this.props, this.props.card);
        this.startCard();
    }

    startCard = async () => {
        const cardname = this.props.cardname;
        if  (this.props.cards[cardname] !== undefined) {
            this.setState({card: this.props.cards[cardname]})
        }

        let res_upd = await ajax(api.sync_card, {cardname});

        if (res_upd.ok) {
            console.log(res_upd.updated, this.state)
            if (res_upd.updated > this.state.card.updated) {
                let res = await ajax(api.get_card, {cardname});
                if (res.ok) {
                    await this.props.saveCard(res.card);
                    this.setState({card: this.props.cards[cardname]})
                }
            } else {
                await syncCard(this.props, this.props.cards[this.state.card.cardname]);
                this.setState({card: this.props.cards[cardname]});
            }
        }

        if (await isMyCard(this.props, this.cardname)) {
            syncNotifications(this.props, this.cardname);
            syncFriends(this.props, this.cardname);
        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    onDelete = async() => {
        const newCardIndex = this.props.cardIndex === 0 ? 0 : this.props.cardIndex - 1;
        if (newCardIndex !== this.props.cardIndex)
            await this.props.dispatch(selectCard(newCardIndex));
        // const __user = await getUserFromServer(this.props.user);
        // await this.props.dispatch(updateUser(__user));
    };

    startSocket() {
        this.socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: this.cardname}});

        this.socket.on('notifications_updated', async (data) => {
            if(await isMyCard(this.props, this.cardname)) {
                console.log("notifications_updated", this.state.card.notifications_updated, data);
                if (this.state.card.notifications_updated === undefined ||
                    this.state.card.notifications_updated < data) {
                    syncNotifications(this.props, this.cardname);
                }
            }
        });
        this.socket.on('friends_updated', async (data) => {
            if(await isMyCard(this.props, this.cardname)) {
                console.log("friends_updated");
                if (this.state.card.friends_updated === undefined ||
                    this.state.card.friends_updated < data) {
                    syncFriends(this.props, this.cardname);
                }
            }
        });
        this.socket.on('updated', async (data) => {
            console.log("UPDATED", data);
            if (data !== this.state.card.updated) {
                await syncCard(this.props, this.state.card);
                this.setState({card: this.props.cards[this.cardname]});
            }
        });
        this.socket.on('deleted', (data) => {
            if(isMyCard(this.props, this.cardname)) {
                this.onDelete()
            }
        });
        this.socket.on('created', async (data) => {
            if(isMyCard(this.props, this.cardname)) {
                await syncUser(this.props);
            }
        });
    }

    addCardTo = async myCardname => {
        let res = await ajax(api.add_card, {friend: this.cardname, cardname: myCardname});
        if (res.ok) {
            switch (res.status) {
                case 'incorrect':
                    Toast.info("ERROR: You can not add this card", 1, undefined, false);
                    break;
                case 'already':
                    //TODO: sync cardholder
                    break;
                case 'requested': case 'added':
                    await this.props.saveFriend(res.friend);
                    await this.updateCard();
                    notifyUpdateNotifications(this.cardname, res.friend.updated);
                    notifyUpdateFriends(myCardname, res.friend.updated);
                    notifyUpdateFriends(this.cardname, res.friend.updated);
                    // Toast.info("card requested", 1, undefined, false);
                    break;
            }
        }
    };
    startAdd = () => {
        const {user} = this.props;

        if (user === undefined || user.cards === undefined || user.cards.length === 0) {
            Modal.alert(t.user_have_not_cards, t.user_have_not_cards_description,
                [ { text: t.ok, onPress: () => {return false;}, style: 'cancel' }] )
        } else if (user.cards.length === 1) {
            this.addCardTo(user.cards[0]);
        } else if (user.cards.length > 1) {
            let args = [];
            for (const cardname of user.cards) {
                args.push({ text: "+"+cardname, onPress: () => this.addCardTo(cardname) });
            }

            Modal.operation(args);
        }
    };

    attemptRemoveCard = async () => {
        const t = translate[this.props.language];
        Modal.alert(null, getText(t, "delete_card_confirmation", {cardname: this.cardname}), [
            { text: t.no, onPress: () => {return false;}, style: 'cancel' },
            { text: t.yes, onPress: () => {
                    this.removeCard();
                }}
        ]);
    };

    removeCard = async () => {
        let cardname = await getOwnerCardname(this.props, this.cardname);
        let res = await ajax(api.remove_card, {
            friend: this.cardname,
            cardname: cardname
        });
        if (res.ok) {
            // this.__card._flipTo(0);
            this.props.deleteFriend(this.cardname, cardname);
            this.updateCard();

            notifyUpdateNotifications(this.cardname, res.updated);
            notifyUpdateFriends(cardname, res.updated);
            notifyUpdateFriends(this.cardname, res.updated);
        }
    };

    onChange = (updated) => {
        if (updated === "deleted") {
            this.socket.emit('deleted');
        } if (updated !== undefined) {
            this.startCard();
            // this.socket.emit('updated', {updated: updated});
        }
    };

    flip = () =>  {
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    };



    render() {

        const {classes}  = this.props;
        const card = this.state.card;

        return <div className={classes.container}>

            <CardFlip
                style={{width: this.props.width, height: this.props.height}}
                className={classes.cardFlip}
                // perspective={Platform.OS === "android" ? 1500 : 800}
                perspective={1500}
                flipZoom={-0.2}
                duration={5000}
                onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
                // useNativeDriver={true}
                isFlipped={this.state.isFlipped}
                ref={(__card) => this.__card = __card}
            >
                <CardFront type={this.state.type} flip={this.flip} card={card}
                           onClose={this.props.onClose}
                           onAdd={this.startAdd}
                           onCancelRequest={this.removeCard}
                           cardname={this.cardname}
                           isModal={this.props.isModal}
                />
                <CardBack type={this.state.type} flip={this.flip} card={card}
                          onClose={this.props.onClose} onChange={this.onChange} onDelete={this.onDelete}
                          onAdd={this.startAdd}
                          onRemoveCard={this.attemptRemoveCard}
                          cardname={this.cardname}
                          isModal={this.props.isModal}
                />
            </CardFlip>
        </div>
    }
}


const styles = (theme) => ({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    cardFlip: {
        // aspectRatio: 17 / 27,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderWidth: 0,
    },
});

CardView = withStyles(styles, {name: 'CardView', withTheme: true})(CardView);

const mapStateToProps = state => {
    return {
        user: state.user,
        cards: state.cards,
        friends: state.friends,
        language: state.language,
        selectedCard: state.selectedCard,
    }
};
const mapDispatchToProps = dispatch => ({
    selectCard: cardname => dispatch(selectCard(cardname)),
    saveCard: card => dispatch(saveCard(card)),
    saveCardParams: card => dispatch(saveCardParams(card)),
    saveUser: user => dispatch(saveUser(user)),
    saveFriend: friend => dispatch(saveFriend(friend)),
    saveNotification: notification => dispatch(saveNotification(notification)),
    deleteFriend: (friend_cardname, cardname) => dispatch(deleteFriend(friend_cardname, cardname)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardView)

