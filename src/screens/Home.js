import React,  {Component} from 'react';
// import {WingBlank, WhiteSpace} from 'antd-mobile';
import {setLanguage, setTheme} from "../redux/actions";
import connect from "react-redux/es/connect/connect";
import '../styles/Home.scss';
import colors from "../constants/colors";
import SignIn from "../views/SignIn";


class Home extends Component {

    renderHome = () => {
        const {user, session} = this.props;

        if(user == null || session == null) {
            return <SignIn/>;
        } else if (user.cards === undefined || user.cards.length === 0) {
            return null;//<CreateCard/>
        } else {
            return null;//<MyCards navigation={this.props.navigation}/>
            // return null
        }
    };

    render() {
        const {theme} = this.props;
        const color = colors[theme];

        return <div className='home'>
            {
                this.renderHome()
            }
        </div>;
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    screen: state.screen,
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme)),
    setLanguage: language => dispatch(setLanguage(language)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)