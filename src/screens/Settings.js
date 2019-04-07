import React, { Component } from 'react';
import { Modal } from 'antd-mobile';

import '../styles/Settings.scss';
import {setLanguage, setSession, setTheme, setUser} from "../redux/actions";
import connect from "react-redux/es/connect/connect";
import colors from "../constants/colors";
import translate, {getText} from "../translations";
import ScrollView from "../components/ScrollView";
import SettingsItem from "../components/SettingsScreen/SettingsItem";
import SettingsSeparator from "../components/SettingsScreen/SettingsSeparator";
import SettingsVersion from "../components/SettingsScreen/SettingsVersion";
import {api} from "../constants/api";
import ajax from "../utils/ajax";
import SettingsHeader from "../components/SettingsScreen/SettingsHeader";

class Content extends Component {

    changeTheme = async () => {
        await this.props.setTheme(this.props.theme === "light" ? "dark" : "light");
    };

    logout = async () => {
        const t = translate[this.props.language];
        Modal.alert(null, t.logout_confirm, [
            { text: t.no, onPress: () => {return false;}, style: 'cancel' },
            { text: t.yes, onPress: async () => {
                    // try { await firebase.auth().signOut(); } catch(e) { }
                    // try { await GoogleSignin.signOut(); } catch(e) { }
                    // try { await LoginManager.logOut(); } catch(e) { }
                    ajax(api.logout, {session: this.props.session});
                    this.props.setUser(null);
                    this.props.setSession(null);
                    // this.props.selectCard(null);
                    // this.props.setFriends([]);
                    // this.props.setNotifications([]);
                }},
        ]);
    };

    clearCache = async () => {
        // const t = translate[this.props.language];
        // Modal.alert(t.clear_cache_confirmation, t.clear_cache_description, [
        //     { text: t.no, onPress: () => {return false;}, style: 'cancel' },
        //     { text: t.yes, onPress: () => {
        //             this.props.selectCard(null);
        //             this.props.setFriends([]);
        //             this.props.setNotifications([]);
        //             this.props.deleteAllCards();
        //             AsyncStorage.clear();
        //         }},
        // ]);
    };

    clearHistory = async () => {
        // const t = translate[this.props.language];
        // Modal.alert(t.clear_history_confirmation, t.clear_history_description, [
        //     { text: t.no, onPress: () => {return false;}, style: 'cancel' },
        //     { text: t.yes, onPress: async () => {
        //             let date = new Date().getTime();
        //             await this.props.saveSearch([], date);
        //             let res = await ajax(api.save_search, {
        //                 search: [],
        //                 search_updated: date
        //             });
        //             if (res.ok) {
        //                 notifyUpdateSearch(this.props.user._id, date);
        //             }
        //         }},
        // ]);
    };

    shareKitkard = async () => {
        // try {
        //     const result = await Share.share({
        //         message: host.uri,
        //     });
        //
        //     if (result.action === Share.sharedAction) {
        //         if (result.activityType) {
        //             // shared with activity type of result.activityType
        //         } else {
        //             // shared
        //         }
        //     } else if (result.action === Share.dismissedAction) {
        //         // dismissed
        //     }
        // } catch (error) {
        //     alert(error.message);
        // }
    };

    action = (item) => {
        switch(item) {
            case "language": this.changeLanguage(); break;
            case "theme": this.changeTheme(); break;
            case "clear_cache":this.clearCache(); break;
            case "clear_history":this.clearHistory(); break;
            case "share_kitkard":this.shareKitkard(); break;
            case "about_kitkard": window.location = "/about"; break;
            case "help": window.location = "/help"; break;
            case "policy": window.location = "/policy"; break;
            case "terms": window.location = "/terms"; break;
            case "logout":this.logout(); break;
            default: break;
        }
    };

    changeLanguage = () => {
        const t = translate[this.props.language];
        Modal.operation([
            { text: getText(t, "english"), onPress: () => this.props.setLanguage('en') },
            { text: getText(t, "spanish"), onPress: () => this.props.setLanguage('es') },
            { text: getText(t, "russian"), onPress: () => this.props.setLanguage('ru') }
        ]);
    };

    render() {
        const {theme, language} = this.props;
        const color = colors[theme];
        const t = translate[language];

        return (
            <div className={"settings"}>
                <ScrollView style={{ flex: 1, width: '100%', backgroundColor: color.background}}>

                    <SettingsHeader/>
                    {/*<SettingsItem item="cardholder"     onPress={this.action}/>*/}
                    {/*<SettingsItem item="keepers"        onPress={this.action} separator={false}/>*/}

                    <SettingsSeparator title="settings"/>
                    <SettingsItem item="language"       onPress={this.action} rightText={getText(t, "current_language")}/>
                    <SettingsItem item="theme"          onPress={this.action} status={theme === "dark"}/>
                    {/*<SettingsItem item="push_notifications"  onPress={this.action} icon={"notifications"}/>*/}
                    {   this.props.user === null ? null :
                        <SettingsItem item="change_password" onPress={this.action} icon="password" title={"change_password"}/>
                    }
                    <SettingsItem item="clear_cache"    onPress={this.action} icon="cache"/>
                    {   this.props.user === null ? null :
                        <SettingsItem item="clear_history" onPress={this.action} icon="history"/>
                    }
                    <SettingsItem item="share_kitkard"  onPress={this.action} icon="share" separator={false}/>

                    <SettingsSeparator title="documentation"/>
                    <SettingsItem item="about_kitkard"  onPress={this.action} icon={"kitkard_round"}/>
                    <SettingsItem item="help"           onPress={this.action} icon={"help"}/>
                    <SettingsItem item="policy"         onPress={this.action}/>
                    <SettingsItem item="terms"          onPress={this.action} separator={false}/>
                    {/*<SettingsItem item="permissions"    onPress={this.action} icon={"terms"} separator={false}/>*/}

                    {
                        this.props.user == null ? null :
                            (
                                <span>
                                <SettingsSeparator title=""/>
                                    <SettingsItem item="logout"         onPress={this.action} separator={false}/>
                                </span>
                            )
                    }
                    <SettingsVersion/>


                </ScrollView>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme,
    screen: state.screen,
    language: state.language,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme)),
    setLanguage: language => dispatch(setLanguage(language)),
    setUser: user => dispatch(setUser(user)),
    setSession: session => dispatch(setSession(session)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)

