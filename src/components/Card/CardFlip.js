import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {withStyles} from "@material-ui/core";
import '../../styles/CardFlip.scss';

class CardFlip extends Component {

    constructor(props) {
        super(props);
        this.state ={
            duration: 5000,
            zoomOut: false,
            isFlipped: false,
            side: 0,
            sides: [],
            progress: 0,
            rotation: 0,
            zoom: 0,
            rotateOrientation: '',
            flipDirection: 'y'
        }
    }

    componentDidMount() {
        this.startParams(this.props)
    }

    componentWillReceiveProps(nextProps, prevProps){
        if (this.state.isFlipped !== nextProps.isFlipped) {
            this.flip();
        }
        this.startParams(nextProps);
    }

    startParams = (props) => {
        this.setState({
            duration: props.duration,
            flipZoom: props.flipZoom,
            sides: props.children
        });
    };

    flip() {
        const duration = 800;
        const halfDuration = duration / 2;
        setTimeout(() => {
            this.setState({zoomOut: false})
        }, halfDuration);
        this.setState({
            isFlipped: !this.state.isFlipped,
            zoomOut: true
        })
    }

    render() {

        const { side, progress, rotateOrientation, zoom, sides } = this.state;
        const { flipZoom, classes } = this.props;

        return (
            <div className={`${classes.container} card-flip ${this.state.isFlipped ? 'flipped' : 'not-flipped'} ${this.state.zoomOut ? 'zoom-out' : 'zoom-in'}`}
                 style={this.props.style}
                 // onClick={() => this.flip()}
            >
                <div className={'card-container card-front'} style={this.props.style}>{sides[0]}</div>
                {/*<div className={'card-container card-front'} style={this.props.style}>front</div>*/}
                <div className={'card-container card-back'} style={this.props.style}>{sides[1]}</div>
                {/*<div className={'card-container card-back'} style={this.props.style}>back</div>*/}
            </div>
        );
    }
}
const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
    },
});

CardFlip.defaultProps = {
    style: {},
    duration: 500,
    flipZoom: 0.09,
    flipDirection: 'y',
    perspective: 800,
    onFlip: () => {},
    onFlipStart: () => {},
    onFlipEnd: () => {},
}

CardFlip.propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    duration: PropTypes.number,
    flipZoom: PropTypes.number,
    flipDirection: PropTypes.string,
    onFlip: PropTypes.func,
    onFlipEnd: PropTypes.func,
    onFlipStart: PropTypes.func,
    perspective: PropTypes.number,
}

CardFlip = withStyles(styles, {name: 'CardFlip', withTheme: true})(CardFlip);
export default CardFlip;
