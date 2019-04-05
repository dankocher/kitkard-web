import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import '../styles/Mobile.scss';
import Content from "../components/Mobile/Content";
import TabBar from "../components/Mobile/TabBar";

class Mobile extends Component {

    render() {
        return (
            <div className="mobile">
                <Content/>
                <TabBar/>
            </div>
        );
    }
}

export default Mobile;
