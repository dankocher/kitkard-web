import React,  {Component} from 'react';
import {Button, ActivityIndicator, Modal} from 'antd-mobile';
import {setLanguage, setSession, setTheme, setUser} from "../redux/actions";
import connect from "react-redux/es/connect/connect";
import colors from "../constants/colors";
import '../styles/SignIn.scss';
import PasswordInputText from "../components/PasswordInputText";
import {getText} from "../translations";
import translate from "../translations";
import {emailValidation} from "../utils/emailValidation";
import ajax from "../utils/ajax";
import {api} from "../constants/api";

const md5 = require('md5');

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        enabled: false,
        socialEnabled: true,
        spinner: false,
        is_login: true
    };

    setPassword(password) {
        this.setState({password});
        this.validate();
    }

    setEmail(email) {
        this.setState({email});
        this.validate();
    }
    validate() {
        let enabled = false;
        if (
            (
                (
                    this.state.is_login
                    && ((this.state.email).replace("+", "")).length > 0
                )
                || emailValidation(this.state.email)
            )
            && this.state.password.length >= 6) {
            enabled = true;
        }

        this.setState({ enabled })
    }

    componentDidMount() {
        this.validate();
    }
    toggleIsLogin = async () => {
        await this.setState({is_login: !this.state.is_login});
        this.validate()
    };

    sign = () => {
        if (this.state.is_login) {
            this.login();
        } else {
            this.registration();
        }
    };
    registration = async () => {
        this.setState({spinner: true});
        let hash = md5(this.state.password);
        let res = await ajax(api.registration, {
            email: this.state.email,
            password: hash,
        });
        if (res.ok) {
            this.setState({spinner: false});
            this.props.setUser(res.user);
            this.props.setSession(res.session);
        } else {
            const t = translate[this.props.language];
            let text = 'ERROR';
            switch (res.status) {
                case "incorrect": text = t.incorrect_email; break;
                case "exist": text = t.user_exist; break;
                case "unreachable": text = t.unreachable; break;
            }
            this.setState({spinner: false});
            Modal.alert(null, text, [ { text: t.ok, onPress: () => {return false;}, style: 'cancel' }] )
        }
    };
    login = async () => {
        this.setState({spinner: true});
        let hash = md5(this.state.password);
        let res = await ajax(api.login, {
            email: this.state.email,
            password: hash,
        });

        if (res.ok) {
            this.setState({spinner: false});
            this.props.setUser(res.user);
            this.props.setSession(res.session);
        } else {
            const t = translate[this.props.language];
            let text = 'ERROR';
            switch (res.status) {
                case "incorrect":
                    text = emailValidation(this.state.email) ? t.incorrect_email : t.incorrect_username;
                    break;
                case "disabled": text = getText(t, "disabled"); break;
                case "unreachable": text = t.unreachable; break;
            }
            this.setState({spinner: false});
            Modal.alert(null, text, [ { text: t.ok, onPress: () => {return false;}, style: 'cancel' }] )
        }
    };
    render() {
        const {theme, language} = this.props;
        const color = colors[theme];
        const t = translate[language];

        return <div className='sign-in' style={{backgroundColor: color.primary}}>
            <ActivityIndicator
                toast
                animating={this.state.spinner}
            />
            <div style={{
                width: 300,
                // height: 100,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <img
                    alt={"Kitkard"}
                    style={{
                        marginBottom: 20,
                        width: 250,
                        height: 59.25
                    }}
                    src={'/assets/images/kitkard_white.png'}
                />
                <input className={'email'}
                           value={this.state.email}
                           onChange={(evt) => this.setEmail(evt.target.value)}
                           placeholder={this.state.is_login ? getText(t, "username_or_email") : getText(t, "enter_email")}
                           autoCapitalize='none'
                />
                <PasswordInputText
                    value={this.state.password}
                    placeholder={getText(t, "password")}
                    iconColor={'white'}
                    onChange={ (password) => this.setPassword(password) }
                />
                <Button
                    disabled={!this.state.enabled}
                    className={'buttonRegister'}
                    onClick={() => this.sign()}>
                    <span className={'submitText'}>{this.state.is_login ? getText(t, 'sign_in') : getText(t, 'register') }</span>
                </Button>
                <Button
                    disabled={false}
                    className={'buttonBack'}
                    onClick={() => this.toggleIsLogin()}>
                    <span className={'submitText'}>{this.state.is_login ? getText(t, 'register') : getText(t, 'sign_in')} </span>
                </Button>
                <div className={'socialButtons'}>
                    <Button className={'social_button'}
                               onClick={this.googleSignIn}>
                        <div className={'social_button_container'}>
                            <img
                                alt="google"
                                className={'social_image'}
                                src={'/assets/images/google.png'} />
                            <div className={'social_text'}>{getText(t, 'sign_in_with_google')}</div>
                        </div>
                    </Button>
                    <Button className={'social_button'} style={{marginTop: 20}}
                               onClick={this.facebookSignIn}>
                        <div className={'social_button_container'}>
                            <img
                                alt="facebook"
                                className={'social_image'}
                                src={'/assets/images/facebook.png'} />
                            <div className={'social_text'}>{getText(t, 'sign_in_with_facebook')}</div>
                        </div>
                    </Button>
                </div>
            </div>
        </div>;
    }
};

const mapStateToProps = state => ({
    theme: state.theme,
    screen: state.screen,
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme)),
    setLanguage: language => dispatch(setLanguage(language)),
    setUser: user => dispatch(setUser(user)),
    setSession: session => dispatch(setSession(session)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)