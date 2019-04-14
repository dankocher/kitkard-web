import React, { Component } from 'react';
import '../../styles/MobileHeader.scss';
import {KitIcon} from "../KitIcon";

class Header extends Component {

    render() {
        const {rightComponent, leftComponent} = this.props;
        return (
            <div className={"header"}>
                {
                    this.props.onBack === undefined ? null :
                        <div className={'header-back-button'} onClick={this.props.onBack}>
                            <KitIcon name={'back'} color={'white'} size={24}/>
                        </div>
                }
                <div className={'center-content'}>
                {
                    leftComponent
                }
                </div>
                <div className={'right-button'}>
                {
                    rightComponent
                }
                </div>
            </div>
        );
    }
}

export default Header;
