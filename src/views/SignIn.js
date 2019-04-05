import React,  {Component} from 'react';
import {Button} from 'antd-mobile';
import {setLanguage, setTheme} from "../redux/actions";
import connect from "react-redux/es/connect/connect";
import colors from "../constants/colors";
import '../styles/SignIn.scss';
import PasswordInputText from "../components/PasswordInputText";
import {getText} from "../translations";
import translate from "../translations";

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
        console.log(password)
        this.setState({password});
    }

    render() {
        const {theme, language} = this.props;
        const color = colors[theme];
        const t = translate[language];

        return <div className='sign-in' style={{backgroundColor: color.primary}}>

            <div style={{
                width: 300,
                // height: 100,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <img
                    style={{
                        marginBottom: 20,
                        width: 250,
                        height: 59.25
                    }}
                    src={'/assets/images/kitkard_white.png'}
                />
                <input className={'email'}
                           value={this.state.email}
                           onChangeText={(email) => this.setEmail(email)}
                           placeholder={this.state.is_login ? getText(t, "username_or_email") : getText(t, "enter_email")}
                           keyboardType="email-address"
                           autoCapitalize='none'
                />
                <PasswordInputText
                    value={this.state.password}
                    placeholder={getText(t, "password")}
                    iconColor={'white'}
                    onChangeText={ (password) => this.setPassword(password) }
                />
                <Button
                    disabled={!this.state.enabled}
                    className={'buttonRegister'}
                    onClick={() => this.sign()}
                    underlayColor='#fff'>
                    <span className={'submitText'}>{this.state.is_login ? getText(t, 'sign_in') : getText(t, 'register') }</span>
                </Button>
                <Button
                    disabled={false}
                    className={'buttonBack'}
                    onClick={() => this.toggleIsLogin()}
                    underlayColor='#fff'>
                    <span className={'submitText'}>{this.state.is_login ? getText(t, 'register') : getText(t, 'sign_in')} </span>
                </Button>
                <div className={'socialButtons'}>
                    <Button className={'social_button'}
                               onClick={this.googleSignIn}>
                        <div className={'social_button_container'}>
                            <img
                                className={'social_image'}
                                src={'/assets/images/google.png'} />
                            <span className={'social_text'}>{getText(t, 'sign_in_with_google')}</span>
                        </div>
                    </Button>
                    <Button className={'social_button'} style={{marginTop: 20}}
                               onClick={this.facebookSignIn}>
                        <div className={'social_button_container'}>
                            <img
                                className={'social_image'}
                                src={'/assets/images/facebook.png'} />
                            <span className={'social_text'}>{getText(t, 'sign_in_with_facebook')}</span>
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)