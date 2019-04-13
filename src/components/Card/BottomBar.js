import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import KitIcon from '../KitIcon';
import colors from '../../constants/colors';

import { connect } from 'react-redux';
import {isCardholder, isPrivate} from "../../helpers/isCardholder";
import {setShare} from "../../redux/actions";
import {isMyCard} from "../../helpers/isMyCard";

class BottomBar extends React.Component {

    constructor(props) {
        super(props);

        this.flip = props.flip;
        this.state = {
            visibleShare: false,
            isPrivate: true
        }
        // this.share = props.share;
    }

    componentWillMount() {
        this.checkPrivate();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.checkPrivate();
    }
    checkPrivate = async () => {
        const {cardname} = this.props;
        const card = this.props.cards[cardname];
        if (await isMyCard(this.props, cardname) || await isCardholder(this.props, cardname) || card === undefined) {
            this.setState({isPrivate: false});
        } else {
            this.setState({isPrivate: this.props.cards[cardname].is_private})
        }

    };

    share = () => {
        this.props.setShare(this.props.cardname);
    };
    render() {
        const icon  = "flip_"+this.props.face;
        const color = colors[this.props.theme];

        return (
            // this.state.isPrivate ? <View style={styles.bottom}/> :
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={this.share}>
                    <KitIcon name="share" size={20} color={color.icon}/>
                </TouchableOpacity>
                <View style={styles.empty}>
                    {/*<Text>{card.updated}</Text>*/}
                </View>
                {
                    <TouchableOpacity style={styles.button} onPress={this.flip}>
                        <KitIcon name={icon} size={20} color={color.icon}/>
                    </TouchableOpacity>
                }
            </View>
        );

    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
        theme: state.theme,
        cards: state.cards,
        friends: state.friends,
    }
};
const mapDispatchToProps = dispatch => ({
    setShare: share => dispatch(setShare(share))
});
export default connect(mapStateToProps, mapDispatchToProps)(BottomBar)


const styles = StyleSheet.create({
    bottom: {
        height: 40,
        flexDirection: "row",
        alignItems: "stretch",
    },
    button: {
        // flex: 1,
        height: '100%',
        aspectRatio: 1,
        width: 40,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
