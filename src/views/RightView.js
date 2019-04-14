import React from "react";
import {withStyles} from "@material-ui/core";

class RightView extends React.Component {
    render() {
        let {view, id} = this.props;
        let newView = React.cloneElement(view, {
            id
        });
        return <div className={this.props.classes.container}>{newView}</div>;
    }
}


const styles = (theme) => ({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        left: 0,
        top: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex: 10000,
        backgroundColor: 'transparent'
    },
});

RightView = withStyles(styles, {name: 'RightView', withTheme: true})(RightView);
export default RightView;
