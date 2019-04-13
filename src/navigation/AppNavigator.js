import React, {Component} from 'react';
import Adaptive from "../Adaptive";
import { setScreen, setLanguage, setSession, setTheme, setUser, selectCard, setNotifications, setFriends, setShare, saveSearch, saveUser } from "../redux/actions";
import connect from "react-redux/es/connect/connect";
import SocketIOClient from 'socket.io-client';
import syncUser from "../helpers/syncUser";
import ajax from "../utils/ajax";
import {api, host} from "../constants/api";

class AppNavigator extends Component {

    componentWillMount() {
        const location = window.location;
        switch (location.pathname) {
            case "/settings":
                this.props.setScreen("settings");
                break;
            case "/notifications":
                this.props.setScreen("notifications");
                break;
            case "/my_cards":
                this.props.setScreen("my_cards");
                break;
            case "/search":
                this.props.setScreen("search");
                break;
            case "/cardholder":
                this.props.setScreen("cardholder");
                break;
            default:
                if (location.pathname.startsWith("/+")) {
                    this.props.setScreen("my_cards");

                    //TODO: if is my card show it
                    //TODO: if is not my card show card in Modal
                }
                break;

        }
        this.props.setShare(null);
        this.checkSession();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        setTimeout(() => {
            if (nextProps.user === null && nextProps.session === null) {
                if (this.socket !== undefined) {
                    this.socket.close();
                }
                this.socket = undefined;
            } else if (this.socket === undefined ) {
                this.startUserSocket();
            }
        }, 5000);
    }

    startUserSocket() {

        if (this.props.user !== null) {
            this.socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: this.props.user._id}});

            this.socket.on('updated', (data) => {
                console.log("updated", data);
                if (data > this.props.user.updated) {
                    syncUser(this.props);
                }
            });
            this.socket.on('search_updated', async (data) => {
                console.log("search_updated", data);
                if (data > this.props.user.search_updated) {
                    this.syncSearch();
                }
            });
        }
    }

    syncSearch = async() => {
        let res = await ajax(api.sync_search, {search_updated: this.props.user.search_updated || 0});
        if (res.ok) {
            if (res.status === 'new'){
                this.props.saveSearch(res.search, res.search_updated)
            } else if (res.status === "old") {
                ajax(api.save_search, {
                    search: this.props.user.search,
                    search_updated: this.props.user.search_updated
                })
            }
        }
    };

    checkSession = async () => {
        if (this.props.session === null || this.props.user === null) {
            if (this.props.session != null) {
                this.props.setSession(null);
            }
            if (this.props.user != null) {
                this.props.setUser(null);
            }
        } else {
            let res = await ajax(api.check_session, {session: this.props.session});

            if (res.ok) {
                if (res.ok && res.status === "session") {
                    await this.props.setSession(res.session);
                }
                this.startUserSocket();
                syncUser(this.props);
                this.syncSearch();
            } else if (res.status === "incorrect") {
                this.props.setSession(null);
                this.props.setUser(null);
                this.props.selectCard(null);
                this.props.setFriends([]);
                this.props.setNotifications([]);
                this.props.setShare(null);
            }

        }
    };

    render() {
        return <Adaptive/>
    }

}

const mapStateToProps = state => ({
    user: state.user,
    session: state.session,
    language: state.language,
    theme: state.theme,
    screen: state.screen,
    share: state.share,
});

const mapDispatchToProps = dispatch => ({
    setScreen: screen => dispatch(setScreen(screen)),
    setLanguage: language => dispatch(setLanguage(language)),
    setTheme: theme => dispatch(setTheme(theme)),
    setUser: user => dispatch(setUser(user)),
    saveUser: user => dispatch(saveUser(user)),
    setSession: session => dispatch(setSession(session)),
    selectCard: cardname => dispatch(selectCard(cardname)),
    setNotifications: notifications => dispatch(setNotifications(notifications)),
    setFriends: friends => dispatch(setFriends(friends)),
    setShare: share => dispatch(setShare(share)),
    saveSearch: (search, search_update) => dispatch(saveSearch(search, search_update)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavigator)
