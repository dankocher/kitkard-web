import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

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
import Header from "../components/Mobile/Header";
import CardsContainerView from "../components/CardsContainerView";

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

                <div className={classes.container}>
                    <Header
                        leftComponent={<div className={classes.headerLeftComponent}>Left</div>}
                        rightComponent={
                            <div className={classes.headerRightButton}>
                                <KitIcon name="plus" size={35} color={'white'}/>
                            </div>
                        }
                    />
                    <div className={classes.body}>
                        <CardsContainerView/>
                    </div>
                </div>
            );
        }
    }
}

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

MyCards = withStyles(styles, {name: 'MyCards', withTheme: true})(MyCards);

const mapStateToProps = state => {
    return {
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
