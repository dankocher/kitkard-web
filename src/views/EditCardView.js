import React from 'react';
import {withStyles} from "@material-ui/core";
import colors from '../constants/colors';
import Header from "../components/Mobile/Header";
import KitIcon from "../components/KitIcon";

const animationDuration = 500;

class EditCardView extends React.Component {

    constructor(props) {
        super(props);

        this.ctx  = props.context;
        this.theme = colors[this.ctx.theme];

        this.state = {
            showView: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({showView: true})
        }, 10);
    }

    close = () => {
        this.setState({showView: false});
        setTimeout(() => {
            let node = document.getElementById(this.props.id);
            node.parentNode.removeChild(node);
        }, animationDuration+50);
    };

    render() {
        const {classes} = this.props;
        console.log(this.props);
        return(
            <div className={`${classes.container} ${this.state.showView ? classes.show : classes.hide}`} style={{backgroundColor: this.theme.primary}}>
                <Header
                    onBack={this.close}
                    leftComponent={
                        <div className={classes.title}>
                            +{this.ctx.cardname}
                        </div>
                    }
                    rightComponent={
                        this.ctx.cardname === this.props.username ? null :
                        <div className={classes.deleteButton} >
                            <KitIcon name={'delete'} size={24} color={'white'}/>
                        </div>
                    }
                />
                <div className={classes.viewContent} style={{backgroundColor: this.theme.background}}>
                    This is Edit Card {this.ctx.cardname}

                    <button onClick={this.close}>back</button>
                    <button onClick={() => this.ctx.selectCard('developer')}>developer</button>
                </div>
            </div>
        )
    }
}

const styles = theme => ({
   container: {
       position: 'absolute',
       width: '100%',
       height: '100%',
       transition: `left ${animationDuration}ms ease-in-out`,
       display: 'flex',
       flexDirection: 'column',
       boxShadow: '0 20px 100px 0 rgba(0, 0, 0, 0.5)'
   },
    show: {
       left: 0,
    },
    hide: {
       left: '150%'
    },
    viewContent: {
        display: 'flex',
        flex: 1,
    },
    title: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 16
    },
    deleteButton: {
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


EditCardView = withStyles(styles, {name: 'EditCardView', withTheme: true})(EditCardView);
export default EditCardView;
/*
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
)(EditCardView)*/
