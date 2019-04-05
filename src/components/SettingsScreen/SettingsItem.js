import React, { Component } from 'react';
import {Switch} from 'antd';
import {connect} from "react-redux";
import colors from "../../constants/colors";
import KitIcon from "../KitIcon";
import translate, {getText} from "../../translations";

class SettingsItem extends Component {

    render() {
        const {theme, language, item, rightText, status, onPress, separator} = this.props;
        const color = colors[theme];
        const t = translate[language];

        const title = item;
        const icon = this.props.icon || item;

        return (
            <div className={"settings-item"} style={{borderBottom: separator === false ? 'none' : '1px solid ' + color.border}}>
                <div
                    className={"settings-item-button"}
                    onClick={() => onPress(item)}
                >
                    <KitIcon name={icon} size={20} color={color.icon}/>
                    <div className="button-container">
                        <div style={{color: color.text, fontSize: 16, marginLeft: 10, textAlign: 'left'}}>{getText(t, title)}</div>
                        {rightText === undefined || rightText === "" ? null :
                            <div style={{color: color.text, fontSize: 16, marginLeft: 10}}>{rightText}</div>
                        }
                        {
                            status === undefined ? null :
                                <div style={{width: 50, height: '100%'}}><Switch checked={status} onChange={() => onPress(item)} color={color.primary}/></div>
                        }
                    </div>
                </div>
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
