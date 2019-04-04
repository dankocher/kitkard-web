import React, { Component } from 'react';

import {connect} from "react-redux";
import {setTheme} from "../../redux/actions";
import colors from "../../constants/colors";
import translate, {getText} from "../../translations";

class SettingsItem extends Component {

    render() {
        const {theme, title, language} = this.props;
        const color = colors[theme];
        const t = translate[language];

        return (
            <div className="settings-header" style={{backgroundColor: color.border}}>
                <span style={{color: color.textSoft, fontSize: 13}}>{getText(t, title)}</span>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    screen: state.screen,
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsItem)
