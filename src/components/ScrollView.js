import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

class ScrollView extends Component {

    render() {
        return (
            <div className={"scroll-view"} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    theme: state.theme
});

export default connect(mapStateToProps)(ScrollView)

