import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import { selectCard } from "../redux/actions";
import SwipeableViews from 'react-swipeable-views';
import {connect} from "react-redux";
import AspectRatio from "./AspectRatio";
import CardView from "./Card/CardView";

class CardsContainerView extends Component {

    renderCards() {
        let cardViews = [];
// const cardname of this.props.user.cards
        for(const cardname of this.props.user.cards) {
            cardViews.push(<div key={`card-${cardname}`} className={this.props.classes.slide}>
                <AspectRatio widthRatio={17} heightRatio={27}>
                    <CardView cardname={cardname}/>
                </AspectRatio>
            </div> )
        }
        return cardViews;
    }

    render() {

        const {classes}  = this.props;

        return <div className={classes.container}>
            <SwipeableViews className={classes.slider} slideClassName={classes.slider} containerStyle={{height: '100%'}}>
                {this.renderCards()}
            </SwipeableViews>
        </div>
    }
}


const styles = (theme) => ({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider: {
        width: '100%',
        height: '100%'
    },
    slide: {
        height: '100%',
        color: theme.text,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    slide1: {
        background: '#FEA900',
    },
    slide2: {
        background: '#B3DC4A',
    },
    slide3: {
        background: '#6AC0FF',
    },
});

CardsContainerView = withStyles(styles, {name: 'CardsContainerView', withTheme: true})(CardsContainerView);

const mapStateToProps = state => {
    return {
        user: state.user,
        cards: state.cards,
        friends: state.friends,
        language: state.language,
        selectedCard: state.selectedCard,
    }
};
const mapDispatchToProps = dispatch => ({
    selectCard: cardname => dispatch(selectCard(cardname)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardsContainerView)

