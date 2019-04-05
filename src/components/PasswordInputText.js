import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import KitIcon from './KitIcon';
// import { View, StyleSheet, TextInput } from 'react-native';
// import { InputItem } from 'antd-mobile';
import '../styles/PasswordInput.scss';

export default class PasswordInputText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            icEye: 'visibility_off',
            password: true
        }
    }

    changePwdType = () => {
        let newState;
        if (this.state.password) {
            newState = {
                icEye: 'visibility',
                password: false
            }
        } else {
            newState = {
                icEye: 'visibility_off',
                password: true
            }
        }

        // set new state value
        this.setState(newState)

    };


    render() {
        return (
            <div className={'passwordView'}>
                <input className={'password'}
                           {...this.props}
                            onChange={(e, text) => this.props.onChangeText(text)}
                           type={this.state.password ? 'password' : 'text'}/>
               <div className='toggle-password'
                    onClick={this.changePwdType}>
                    <KitIcon className={'icon'}
                          name={this.state.icEye}
                          size={this.props.iconSize}
                          color={'white'}
                    />
               </div>
            </div>
        );
    }
}

PasswordInputText.defaultProps = {
    iconSize:25,
};

