import React from 'react';
import PropTypes from 'prop-types';
import IcomoonReact from 'icomoon-react';
import iconSet from '../assets/selection.json';

const KitIcon = (props) => {
    const { color, size, name } = props;
    return <IcomoonReact iconSet={iconSet} color={color} size={size} icon={name} />;
};

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
