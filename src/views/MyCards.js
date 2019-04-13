import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
// import { ActionSheet, ActionSheetItem } from 'react-native-action-sheet-component';
// import {Text} from "react-native-elements";
// import { Header, Title, Subtitle } from "native-base";
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';

import colors from "../constants/colors";
import translate from "../translations";

import {
    saveFriend,
    saveSearch,
    saveUser,
    selectCard,
    setFriends,
    setNotifications,
    setSession,
    setShare,
    setUser
} from "../redux/actions";

import KitIcon from "../components/KitIcon";
import CreateCard from "./CreateCard";
// import Header from "../components/Mobile/Header";
import CardsContainerView from "../components/CardsContainerView";
import {getCardImage} from "../helpers/cardImage";
import syncFriends from "../helpers/syncFriends";
import syncNotifications from "../helpers/syncNotifications";
import {dimensions} from "../constants/dimensions";

class MyCards extends Component {
    state = {
        add_card: false,
        name: null
    };


    // componentDidMount(): void {
    //     //TODO: remove this
    //     this.props.navigation.navigate('NoAnimationNavigator', {view: 'search', title: 'search'});
    // }

    componentWillMount() {
        if (this.props.selectedCard === null) {
            this.props.selectCard(this.props.user.cards[0]);
        }
    }

    componentDidMount() {
        this.sync();
    }

    async sync() {
        await syncFriends(this.props);
        await syncNotifications(this.props);
    }

    _renderHeader() {
        const { user, theme } = this.props;
        const color = colors[theme];
        if (user.cards !== undefined && user.cards.length > 0) {
            const cardname = this.props.selectedCard != null ? this.props.selectedCard : this.props.user.cards[0];

            const card = this.props.cards[this.props.selectedCard];
            return (
                <View style={styles.header}
                      placement="center">
                    <TouchableOpacity style={styles.leftContainer} onPress={this.showTopActionSheet}>
                        <View style={styles.leftContainer}>
                            <View style={styles.left} onPress={this.showTopActionSheet}>
                                {getCardImage(card, 30, true)}
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.headerTitle}>{`+${cardname || ""}`}</Text>
                                {
                                    card === undefined || card.name === "" ? null :
                                        <Text style={styles.headerSubtitle}>{card.name}</Text>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ add_card: true }) } >
                        <View style={styles.rightButton}>
                            <KitIcon name="plus" size={30} color="white"/>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return <View/>
        }
    }

    showTopActionSheet = () => {
        if (this.topActionSheet !== undefined)
            this.topActionSheet.show();
    };

    onItemPress = (value) => {
        this.props.selectCard(value);
    };

    getActionSheetItems(cards) {
        if (cards !== undefined && cards != null && cards.length > 0) {
            var items = [];

            cards.forEach((cardname, key) => {
                const card = this.props.cards[cardname];
                items.push( null
                   /* <ActionSheetItem
                        index={key}
                        key={cardname}
                        style={styles.actionSheetItem}
                        textStyle={styles.actionSheetItemText}
                        text={<Text style={styles.actionSheetItemText}>{`    +${cardname}`}</Text>}
                        value={cardname}
                        icon={getCardImage(card, 30, true)}
                        showSelectedIcon={false}
                        onPress={() => this.onItemPress(cardname)}
                    />*/
                )
            });
            return items;
        } else {
            return <View/>;
        }
    }

    _renderActionSheet(cards) {
        if (this.props.user.cards.length > 1) {
            return (null
            );
            /*<ActionSheet
                style={styles.actionSheet}
                ref={(actionSheet) => {
                    this.topActionSheet = actionSheet;
                }}
                position="top"
                onChange={this.onChange}
                showSeparator={false}
                showSparator={false}
                showSelectedIcon={false}
            >
                {this.getActionSheetItems(cards)}
            </ActionSheet>
            */
        } else {
            return null;
        }
    }
    render() {

        const {theme, language, user, selectedCard, classes} = this.props;
        const t = translate[language];
        const color = colors[theme];

        if (this.state.add_card) {
            return (
                <CreateCard onCancel={() => this.setState({add_card: false})}/>
            );
        } else {
            return (

                <View style={styles.container}>
                {/*<div className={classes.container}>*/}
                    {this._renderHeader()}
                    {/*<Header*/}
                        {/*leftComponent={<div className={classes.headerLeftComponent}>Left</div>}*/}
                        {/*rightComponent={*/}
                            {/*<div className={classes.headerRightButton}>*/}
                                {/*<KitIcon name="plus" size={35} color={'white'}/>*/}
                            {/*</div>*/}
                        {/*}*/}
                    {/*/>*/}
                    <div style={{flex: 1, backgroundColor: color.background}}>
                        <CardsContainerView/>
                    </div>
                 {/*</div>*/}
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        backgroundColor: colors.light.primary,
        borderBottomWidth: 0,
        elevation: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    left: {
        width: 48,
        height: dimensions.headerButtonSize,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
    },
    headerSubtitle: {
        color: 'white',
    },
    actionSheet: {
        marginTop: dimensions.actionSheetMarginTop,
        backgroundColor: colors.light.primary
    },
    actionSheetItem: {
        backgroundColor: colors.light.primary,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
    },
    actionSheetItemText: {
        color: 'white',
        marginLeft: 15,
        fontSize: 20,
    },
    rightButton: {
        width: dimensions.headerButtonSize,
        height: dimensions.headerButtonSize,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

/*
const styles = (theme) => ({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    headerRightButton: {
        height: '100%',
        width: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLeftComponent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    body: {
        flex: 1,
        backgroundColor: theme.background
    }
});
*/
// MyCards = withStyles(styles, {name: 'MyCards', withTheme: true})(MyCards);

const mapStateToProps = state => {
    return {
        theme: state.theme,
        user: state.user,
        cards: state.cards,
        friends: state.friends,
        notifications: state.notifications,
        language: state.language,
        selectedCard: state.selectedCard,
    }
};
const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    setSession: session => dispatch(setSession(session)),
    selectCard: cardname => dispatch(selectCard(cardname)),
    saveUser: user => dispatch(saveUser(user)),
    setNotifications: notifications => dispatch(setNotifications(notifications)),
    setFriends: friends => dispatch(setFriends(friends)),
    saveFriend: friend => dispatch(saveFriend(friend)),
    setShare: share => dispatch(setShare(share)),
    saveSearch: (search, search_update) => dispatch(saveSearch(search, search_update)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCards)



/*
const styles = {
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.light.primary,
        borderBottomWidth: 0,
        elevation: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    left: {
        width: dimensions.headerButtonSize,
        height: dimensions.headerButtonSize,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
    },
    headerSubtitle: {
        color: 'white',
    },
    actionSheet: {
        marginTop: dimensions.actionSheetMarginTop,
        backgroundColor: colors.light.primary
    },
    actionSheetItem: {
        backgroundColor: colors.light.primary,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
    },
    actionSheetItemText: {
        color: 'white',
        marginLeft: 15,
        fontSize: 20,
    },
    rightButton: {
        width: dimensions.headerButtonSize,
        height: dimensions.headerButtonSize,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
*/
