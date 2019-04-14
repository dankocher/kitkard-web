import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import IcomoonReact from 'icomoon-react';
import iconSet from '../assets/selection.json';

class KitIcon extends React.Component {

    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
    };

    render() {
        const {color, size, name} = this.props;
        return <View ref={component => this._root = component}>
            <IcomoonReact iconSet={iconSet} color={color} size={size} icon={name}/>
        </View>;
    }
}

KitIcon.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

KitIcon.defaultProps = {
    color: '#f00',
    size: '100%',
};

export default KitIcon;
export {KitIcon}
