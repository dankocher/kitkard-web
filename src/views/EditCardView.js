import React from 'react';
import {Alert, View, Text, TouchableOpacity, StyleSheet} from "react-native";

import {withStyles} from "@material-ui/core";
import colors from '../constants/colors';
import Header from "../components/Mobile/Header";
import KitIcon from "../components/KitIcon";
import translate, {tr} from "../translations";
import ajax from "../utils/ajax";
import {api} from "../constants/api";

import EditPicture from '../components/EditCard/EditPicture';
import EditPrivate from '../components/EditCard/EditPrivate';
import EditText from "../components/EditCard/EditText";
import EditContact from "../components/EditCard/EditContact";
import DraggableFlatList from "../components/DraggableFlatList";
import ContactsListModal from "../components/ContactsListModal";

const animationDuration = 500;

class EditCardView extends React.Component {

    constructor(props) {
        super(props);

        this.__props  = props.__props;
        this.theme = colors[this.__props.theme];
        this.cardname = props.__props.cardname;
        this.card = props.__props.cards[this.cardname];
        this.onChange = props.__props.onChange;
        this.onDelete = props.__props.onDelete;

        this.state = {
            showView: false,
            items: [],
            addContactsVisible: false,
            spinner: false,
            card: this.__props.cards[this.cardname]
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({showView: true})
        }, 10);

        this.getItems(this.__props.cards[this.cardname]);
        setTimeout(() => {
            // TODO:
            // this.__props.navigation.setParams({ startDeleteCard: this.startDeleteCard })
        }, 1000);
    }

    close = () => {
        this.onChange(this.card.updated || this.card.date);
        this.setState({showView: false});
        setTimeout(() => {
            let node = document.getElementById(this.props.id);
            node.parentNode.removeChild(node);
        }, animationDuration+50);
    };

    componentWillMount() {
        this.setState({
            card: this.__props.cards[this.cardname]
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({card: nextProps.cards[this.cardname]})
        this.getItems();

        console.log(nextProps);
    }

    // componentWillUnmount() {
    //     this.onChange(this.card.updated || this.card.date);
    // }

    getItems() {
        const card = this.__props.cards[this.cardname];
        console.log(this.cardname);
        console.log(card);
        if (card === undefined) return;
        const items = [
            {
                type: "pictures",
                data: card.pictures || []
            },
            {
                type: "is_private",
                data: card.is_private || false
            },
            {
                type: "name",
                data: card.name || ""
            },
            {
                type: "description",
                data: card.description || ""
            }
        ];

        if (card.contacts !== undefined && card.contacts.ids !== undefined && card.contacts.ids.length > 0) {
            for( const id of card.contacts.ids) {
                items.push({
                    type: "contact",
                    data: card.contacts.byId[id]
                })
            }
        }
        this.setState({items: items});
    };

    startDeleteCard = async() => {
        const t = translate[this.__props.language];
        const cardname = this.cardname;
        Alert.alert( null, tr(t.delete_card_confirmation, {cardname: cardname}),
            [
                {text: t.no, style: 'cancel'},
                {text: t.yes, onPress: async() => {
                        this.setState({spinner: true});
                        let res = await ajax(api.delete_card, {cardname: cardname});
                        let updated = new Date().getTime();

                        console.log(res);
                        if (res.ok) {
                            updated = res.updated;
                        }

                        await this.__props.selectCard(this.__props.user.cards[0]);
                        await this.__props.setUser({
                            ...this.__props.user,
                            updated: updated,
                            cards: this.__props.user.cards.filter(c => c !== cardname)
                        });
                        await this.__props.deleteCard(cardname);
                        this.setState({spinner: false});
                        this.__props.navigation.navigate("HomeNavigator");
                    }},
            ],
            { cancelable: false }
        )
    };

    onDeleteContact = async() => {
        await this.setState({
            items: this.getItems()
        });
    };

    getListItem = ({ item, index, move, moveEnd, isActive }) => {
        // const card = this.__props.cards[this.__props.selectedCard];
        const card = this.state.card;
        switch(item.type)
        {
            case "pictures":
                return (<EditPicture card={card}
                                     user={this.__props.user}
                                     language={this.__props.language}
                                     theme={this.__props.theme}
                                     saveCard={this.__props.saveCard}
                />);

            case "is_private":
                return (<EditPrivate cardname={this.cardname}
                                     context={this.__props}
                                     user={this.__props.user}
                                     language={this.__props.language}
                                     theme={this.__props.theme}
                                     cards={this.__props.cards}
                                     saveCard={this.__props.saveCard}
                />);

            case "name": case "description":
            return (<EditText cardname={this.cardname}
                              type={item.type}
                              user={this.__props.user}
                              language={this.__props.language}
                              theme={this.__props.theme}
                              cards={this.__props.cards}
                              saveCard={this.__props.saveCard}
                              __props={this.__props}
            />);

            case "contact":
                return (<EditContact card={card} contact={item.data}
                                     onDelete={() => this.onDeleteContact()}
                                     move={move}
                                     moveEnd={moveEnd}
                                     isActive={isActive}
                                     user={this.__props.user}
                                     language={this.__props.language}
                                     theme={this.__props.theme}
                                     cards={this.__props.cards}
                                     saveCard={this.__props.saveCard}
                                     __props={this.__props}
                />);
            default: return null;
        }
    };

    startAddContact(visible) {
        this.setState({addContactsVisible: visible});
    }

    renderSeparator() {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor:  colors[this.__props.theme].cardLines,
                    marginLeft: "0%"
                }}
            />
        );
    };

    addContact = async (type) => {
        const contact = {
            id: type+"-"+new Date().getTime(),
            type: type,
            name: type,
            value: ""
        };

        const card = this.state.card;
        if (card.contacts === undefined || card.contacts.byId === undefined || card.contacts.ids === undefined) {
            card.contacts = {
                byId: {},
                ids: []
            }
        }
        this.state.card.contacts.byId[contact.id] = contact;
        this.state.card.contacts.ids.push(contact.id);
        this.state.card.updated = new Date().getTime();
        await this.__props.saveCard(card);
        // await this.getItems();

        this.forceUpdate();

        setTimeout(() => {
            // this.__props.navigation.navigate("EditContact", {contactId: contact.id, type: contact.type, cardname: this.cardname})
            // TODO: add Contact
            // this.__props.navigation.navigate("NoAnimationNavigator", {
            //     view: "contact",
            //     title: translate[this.__props.language]["contact_"+contact.type],
            //     contactId: contact.id,
            //     cardname: this.cardname
            // })
        }, 500);
    };

    changePosition = async ({ data }) => {
        await this.setState({
            items: data
        });

        let items = [];
        let ids = [];
        items.push(data.find(d => d.type === "pictures"));
        items.push(data.find(d => d.type === "is_private"));
        items.push(data.find(d => d.type === "name"));
        items.push(data.find(d => d.type === "description"));
        for (const item of data) {
            if (item.type === "contact") {
                items.push(item);
                ids.push(item.data.id);
            }
        }

        await this.setState({items: items});

        this.state.card.contacts.ids = ids;
        this.state.card.updated = new Date().getTime();
        await this.forceUpdate();
        this.__props.saveCard(this.state.card);

        // saveUserCard(this.__props, card);
    };

    onMoveContact = () => {
        console.log("OnMoveEvent")
    };

    showContactsModalList = () => {
        setTimeout(() => {
            this.startAddContact(!this.state.addContactsVisible);
        }, 100);
    };

    render() {
        const {classes} = this.props;
        const color = colors[this.__props.theme];
        const t = translate[this.__props.language];
        return(
            <div className={`${classes.container} ${this.state.showView ? classes.show : classes.hide}`} style={{backgroundColor: this.theme.primary}}>
                <Header
                    onBack={this.close}
                    leftComponent={
                        <div className={classes.title}>
                            +{this.__props.cardname}
                        </div>
                    }
                    rightComponent={
                        this.__props.cardname === this.__props.username ? null :
                        <div className={classes.deleteButton} >
                            <KitIcon name={'delete'} size={24} color={'white'}/>
                        </div>
                    }
                />
                <div className={classes.viewContent} style={{backgroundColor: this.theme.background}}>
                    <View style={{flex:1, borderBottomWidth: 0, backgroundColor: color.background}}>

                        <DraggableFlatList
                            ref="flatList"
                            data={this.state.items}
                            renderItem={this.getListItem}
                            keyExtractor={item => `${item.type}${item.data.id || ""}`}
                            // ItemSeparatorComponent={() => this.renderSeparator()}
                            onMoveBegin={this.onMoveContact}
                            onMoveEnd={this.changePosition}
                            scrollPercent={5}
                        />
                    </View>
                    <View  style={[classes.bottomToolBar, {backgroundColor: color.tabbar}]}>
                        <TouchableOpacity style={[styles.touchableBottom, {backgroundColor: color.tabbar}]}
                                   iconName="plus" title="Add contact"
                                   onPress={() => this.showContactsModalList()}>
                            <div className={classes.buttonContainer}>
                                <KitIcon name="plus" size={20} color={color.primary}/>
                                <Text style={{color: color.primary}}>{t.add_contact}</Text>
                            </div>
                        </TouchableOpacity>
                    </View>
                    <ContactsListModal
                        addContactsVisible={this.state.addContactsVisible}
                        onCancel={() => this.setState({addContactsVisible: false})}
                        onSelect={(type) => this.addContact(type)}
                        theme={this.__props.theme}
                        language={this.__props.language}
                    />
                </div>
            </div>
        )
    }
}

const __styles = theme => ({
   container: {
       position: 'absolute',
       width: '100%',
       height: '100%',
       transition: `left ${animationDuration}ms ease-in-out`,
       display: 'flex',
       flexDirection: 'column',
       boxShadow: '0 20px 100px 0 rgba(0, 0, 0, 0.5)'
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
    deleteButton: {
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: {
        height: 0,
        width: "100%",
        marginLeft: "0%"
    },
    buttonContainer: {
        flex: 1,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


EditCardView = withStyles(__styles, {name: 'EditCardView', withTheme: true})(EditCardView);
export default EditCardView;
/*
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCardView)*/

const styles = StyleSheet.create({

    bottomToolBar: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '100%'
    },
    buttonContainer: {
        flex: 1,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableBottom: {
        display: "flex",
        height: 40,
        width: '100%'
    }
});
