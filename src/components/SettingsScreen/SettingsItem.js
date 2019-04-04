import React, { Component } from 'react';
import {Button} from 'antd-mobile';
import {connect} from "react-redux";
import {setTheme} from "../../redux/actions";
import colors from "../../constants/colors";
import KitIcon from "../KitIcon";
import translate, {getText} from "../../translations";
// import KitIcon from "KitIcon";

import '../../styles/SettingsItem.scss'

class SettingsItem extends Component {

    render() {
        const {theme, language, item, rightText, status, onPress, separator} = this.props;
        const color = colors[theme];
        const t = translate[language];

        const title = item;
        const icon = this.props.icon || item;

        return (
            <div className={"settings-item"}>
                <Button
                    className={"settings-item-button"}
                    onClick={() => onPress(item)}
                    style={{backgroundColor: color.background}}>
                    <KitIcon name={icon} size={20} color={color.icon}/>
                    <span style={{color: color.text, fontSize: 16, marginLeft: 10, flex: 1}}>{getText(t, title)}</span>
                    <span style={{color: color.text, fontSize: 16, marginLeft: 10}}>{rightText}</span>
                    {/*{*/}
                        {/*status === undefined ? null :*/}
                            {/*<Switch checked={status} onChange={() => onPress(item)} color={color.primary}/>*/}
                    {/*}*/}
                </Button>
                {
                    separator === false ? null : <div style={{backgroundColor: color.border, height: 0.5, width: '100%'}}/>
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    screen: state.screen,
    language: state.language,
});

export default connect(
    mapStateToProps
)(SettingsItem)
