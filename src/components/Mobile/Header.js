import React, { Component } from 'react';
import '../../styles/MobileHeader.scss';

class Header extends Component {

    render() {
        const {rightComponent, leftComponent} = this.props;
        return (
            <div className={"header"}>
                {
                    leftComponent
                }
                {
                    rightComponent
                }
            </div>
        );
    }
}

export default Header;
