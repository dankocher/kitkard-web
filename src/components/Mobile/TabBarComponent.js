import React, {Component} from "react";
import {BottomTabBar} from "react-navigation-tabs";
import {connect} from "react-redux";
import colors from "../../constants/colors";

class TabBarComponent extends Component<props> {
    render() {
        return (
            <BottomTabBar
                style={{ backgroundColor: colors[this.props.theme].tabBar }}
                {...this.props}
            />
        );
    };
}


// const TabBarComponent = props => (<BottomTabBar {...props}/>);

// export default TabBarComponent;

const mapStateToProps = state => {
    return {
        theme: state.theme
    }
};
export default connect(mapStateToProps)(TabBarComponent)