import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import {KitIcon} from '../KitIcon';
import {isMyCard} from "../../helpers/isMyCard";
import colors from "../../constants/colors";

class CloseCardButton extends React.Component {

    state = {
        show: false
    };

    componentDidMount() {
        this.checkIfIsMyCard();
    }

    async checkIfIsMyCard() {
        let my_card = await isMyCard(this.props, this.props.cardname);
        this.setState({show: !my_card})
    }


    render() {
        const {cardname, user} = this.props;
        const color = colors[this.props.theme];

        if (this.props.isModal || this.state.show) {
            return (
                <TouchableOpacity style={[styles.closeButton]}
                                  hide={true}
                                  underlayColor={color.cardLines}
                                  onPress={this.props.onClose}>
                    <KitIcon name="cross" size={25} color={color.icon}/>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
        cards: state.cards,
        theme: state.theme
    }
};
export default connect(mapStateToProps)(CloseCardButton)

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        zIndex: 100
    }
});

// export const CardView = generateCardView()
