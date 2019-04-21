import React from 'react';
import '../styles/ModalCard.scss';
import CardView from "./Card/CardView";
import AspectRatio from "./AspectRatio";
import {setScreen} from "../redux/actions";
import connect from "react-redux/es/connect/connect";
import {isMyCard} from "../helpers/isMyCard";

class ModalCard extends React.Component {

    state = {
        cardname: ""
    };

    componentWillMount() {
        this.startCard();
    }

    startCard = async () => {
        if (window.location.pathname.startsWith("/+")) {
            let cardname = window.location.pathname.replace("/+", "");

            if (cardname !== "" && !await isMyCard(this.props, cardname)) {
                setTimeout(() => {
                    this.setState({cardname})
                }, 1000);
            }
        }
    };

    close = () => {
        this.setState({cardname: ""});
        window.history.pushState(null, null, "/")
    };

    render() {

        if (this.state.cardname === "") return null;

        return (
            <div className={'modal-card'}>
                <div className="overlay" onClick={this.close}/>
                <div className="card-container">
                    <AspectRatio widthRatio={17} heightRatio={27}>
                        <CardView cardname={this.state.cardname} onClose={this.close}/>
                    </AspectRatio>
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    screen: state.screen,
    user: state.user,
    cards: state.cards,
});

const mapDispatchToProps = dispatch => ({
    setScreen: screen => dispatch(setScreen(screen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalCard)
