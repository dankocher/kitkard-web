import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import '../styles/ScrollView.scss';

class ScrollView extends Component {

    render() {
        return (
            <div className={"scroll-view"} style={this.props.style}>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme
});

export default connect(mapStateToProps)(ScrollView)

