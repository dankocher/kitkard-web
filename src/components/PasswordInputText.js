import React from 'react';
// import KitIcon from 'react-native-vector-icons/MaterialIcons';
import KitIcon from './KitIcon';
// import { View, StyleSheet, TextInput } from 'react-native';
// import { InputItem } from 'antd-mobile';
import '../styles/PasswordInput.scss';
import PropTypes from "prop-types";

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
        const {onChange, iconSize} = this.props;

        return (
            <div className={'passwordView'}>
                <input className={'password'}
                       placeholder={this.props.placeholder}
                       onChange={(evt) => onChange(evt.target.value)}
                       value={this.props.value}
                       type={this.state.password ? 'password' : 'text'}/>
               <div className='toggle-password'
                    onClick={this.changePwdType}>
                    <KitIcon className={'icon'}
                          name={this.state.icEye}
                          size={iconSize}
                          color={'white'}
                    />
               </div>
            </div>
        );
    }
}

PasswordInputText.defaultProps = {
    onChange: PropTypes.Function,
    iconSize: 25,
};

