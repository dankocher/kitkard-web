import React, { Component, Fragment } from 'react';

import {connect} from "react-redux";
import {setLanguage, setTheme, setUser} from "../../redux/actions";
import colors from "../../constants/colors";
import SettingsSeparator from "./SettingsSeparator";

import translate, {getText} from "../../translations";

import __package from '../../../package.json';

class SettingsVersion extends Component {

    render() {
        const {theme, language} = this.props;
        const color = colors[theme];
        const t = translate[language];

        return (
            <div style={[styles.container, {backgroundColor: color.border}]}>
                <SettingsSeparator title=""/>
                <div style={[styles.text, {color: color.textSoft}]}>
                    {getText(t, "version", {version: __package.version, build: __package.build})}
                </div>
                <div style={[styles.text, {color: color.textSoft}]}>
                    {getText(t, "copyright", {year: new Date().getFullYear()})}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    language: state.language,
});

export default connect(
    mapStateToProps
)(SettingsVersion)

const styles = ({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 5
    },
    text: {
        fontSize: 12,
        marginTop: 10,
    }
});
