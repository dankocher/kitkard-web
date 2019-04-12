import React,  {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

class AspectRatio extends Component {
    static propTypes = {
        widthRatio: PropTypes.number.isRequired,
        heightRatio: PropTypes.number.isRequired,
    };

    state = {
        width: 0,
        height: 0
    };

    resize = () => {
        const {widthRatio, heightRatio} = this.props;
        const maxHeight = this.container.clientHeight - 20;
        const maxWidth = this.container.clientWidth - 20;

        let width = maxWidth;
        let height = maxWidth * heightRatio / widthRatio;

        if (height > maxHeight) {
            height = maxHeight;
            width = maxHeight * widthRatio / heightRatio;
        }

        this.setState({ width, height});
    };

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {

        const {classes} = this.props;

        return <div className={classes.container} ref={ (container) => this.container = container}>
            <div className={classes.content} style={{width: this.state.width, height: this.state.height}}>
                {this.props.children}
            </div>
        </div>;
    }
}



const styles = (theme) => ({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {

    }
});

export default withStyles(styles, {name: 'AspectRatio', withTheme: true})(AspectRatio);
