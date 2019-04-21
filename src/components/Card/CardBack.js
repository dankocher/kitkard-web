import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
// import { OfflineImage } from 'react-native-image-offline';
import { connect } from 'react-redux';

import ContactView from './ContactView';
import colors from '../../constants/colors';
import BottomBar from './BottomBar';

import CloseCardButton from "./CloseCardButton";
import BigButton from "./BigButton";
import ImageOffline from "../ImageOffline";
import RightViewNavigator from '../../views/RightViewNavigator';
import EditCardView from "../../views/EditCardView";
import {saveCard, selectCard} from "../../redux/actions";

class CardBack extends React.Component {

    constructor(props) {
        super(props);

        this.flip = props.flip;
        this.state = {
            contacts: {
                    byId: {},
                    ids: []
                }
        }
    }

    bigButtonEvent = (action) => {
        switch (action) {
            case "edit":
                RightViewNavigator(
                    <EditCardView username={this.props.user.username} __props={this.props}/>
                   );
                break;
            case "plus":
                this.props.onAdd();
                break;
            case "delete": // cancel request
                this.props.onRemoveCard();
                break;
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateContacts(nextProps)
    }
    componentWillMount() {
        this.updateContacts(this.props);
    }

    updateContacts(props) {
        if (props.card !== undefined && props.card.contacts !== undefined) {
            this.setState({contacts: props.card.contacts})
        } else {
            this.setState({contacts: {byId: {}, ids: []}});
        }
    }

    onDelete = () => {
        this.props.onDelete()
    };

    componentDidMount() {
        //TODO: remove this
        // setTimeout(() => {
        //     if (this.props.card.cardname === "daniel") this.bigButtonEvent("edit");
        // }, 1000);
        // if (this.props.card.cardname === "daniel") this.bigButtonEvent("edit");
    }

    _renderContact(item) {
        const contact = this.state.contacts.byId[item];
        return <ContactView contact={contact}/>
    }

    render() {
        // const { card } = this.props;
        const color = colors[this.props.theme];

        // const card = this.props.cards[this.props.card.cardname];
        const card = this.props.card;
        const cardname = this.props.cardname;

        if (card !== undefined && card.contacts === undefined) {
            card.contacts = {
                byId: {},
                ids: []
            }
        }

        return (
            card === undefined ? null :
            <View style={[styles.face, {backgroundColor: color.card}]}>
                <View style={styles.inside}>
                    <View style={[styles.top]}>
                        <CloseCardButton cardname={card.cardname} onClose={this.props.onClose} isModal={this.props.isModal}/>
                        <View style={[styles.topContainer]}>

                            {
                                //<Image style={styles.image} source={getCardPicture(card, "s")}/>
                                <ImageOffline style={[styles.image]}
                                        size={'small'}
                                        card={card} />
                            }

                            <View style={styles.data}>
                                <Text style={[styles.name, {color: color.text}]}>{card.name || ""}</Text>
                                <Text style={[styles.description, {color: color.text}]}>{card.description || ""}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contacts}>
                        { this.state.contacts === undefined || this.state.contacts.ids.length === 0 ? null :
                            <FlatList
                                data={this.state.contacts.ids}
                                keyExtractor={item => `${item}`}
                                renderItem={({item}) => this._renderContact(item)}
                            />
                        }
                    </View>
                    <View style={styles.separator}>
                        <View style={[styles.line, {borderColor: color.cardLines}]}/>
                        <BigButton cardname={cardname} isFront={false} type={this.props.type} bigButtonEvent={(action) => this.bigButtonEvent(action)}/>
                    </View>
                    <BottomBar style={styles.bottom}
                               cardname={cardname}
                               flip={this.flip}
                               face="front"
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        theme: state.theme,
        language: state.language,
        cards: state.cards,
    }
};
const mapDispatchToProps = dispatch => ({
    selectCard: cardname => dispatch(selectCard(cardname)),
    saveCard: card => dispatch(saveCard(card)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardBack)

const styles = StyleSheet.create({
    face: {
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-between',
        aspectRatio: 17 / 27,
        flex: 1,
        borderRadius: 20,
        // shadowColor: 'rgba(0,0,0,0.5)',
        // shadowOffset: {
        //     width: 0,
        //     height: 1
        // },
        // shadowOpacity: 0.8,
        // elevation: 6,
        boxShadow: '0 1px 8px 0 rgba(0,0,0,0.4)',
        borderWidth: 0,
        overflow: 'hidden',
        height: '100%'
    },
    inside: {
        flex: 1,
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 20,
        overflow: "hidden"
    },
    top: {
        padding: 15,
        width: '100%',
        flexDirection: "column",
    },
    topContainer: {
        flexDirection: "row",
        // marginBottom: 15,
    },
    image: {
        width: 60,
        height: 60,
        aspectRatio: 1,
        borderRadius: 10,
        marginRight: 15
    },
    data: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
    },
    description: {
        marginTop: 10
    },
    separator: {
        position: 'absolute',
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        // height: 36,
        width: '100%',
        // flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 72,
        zIndex: 9999,
    },
    line: {
        paddingTop: 18,
        borderBottomWidth: 0.5,
        width: '100%',
        // flex: 1,
    },

    contacts: {
        flex: 1,
        // backgroundColor: 'green'
    },
    bottom: {
        height: 40,
    },
})
