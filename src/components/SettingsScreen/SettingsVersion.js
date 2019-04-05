import React, { Component } from 'react';

import {connect} from "react-redux";
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
            <div className='settings-version' style={{backgroundColor: color.border}}>
                <SettingsSeparator title=""/>
                <div className='text' style={{color: color.textSoft}}>
                    {getText(t, "version", {version: __package.version, build: __package.build})}
                </div>
                <div className='text' style={{color: color.textSoft}}>
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
