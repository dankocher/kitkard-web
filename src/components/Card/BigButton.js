import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {KitIcon} from '../KitIcon';
import colors from '../../constants/colors';
import { connect } from 'react-redux';

import {getOwnerCardname} from "../../helpers/isCardholder";
import translate, {getText} from "../../translations";
// import {Modal} from "@ant-design/react-native";
// import {notifyToSocketSyncCardholder} from "../helpers/sync";

class BigButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            action: null,
            owner: ""
        }
    }

    checkOwner = async () => {
        const owner = await getOwnerCardname(this.props, this.props.cardname);
        this.setState({owner: owner});
    };

    componentWillReceiveProps() {
        this.checkAction();
        this.checkOwner();
    }

    componentWillMount() {
        this.checkAction();
    }

    checkAction = () => {
        const {isFront, type} = this.props;
        switch(type)
        {
            case "cards":
                this.setState({action: isFront ? null : 'edit'});
                break;
            case "cardholder":
                this.setState({action: isFront ? "cardholder" : 'delete'});
                break;
            case "requested":
                this.setState({action: isFront ? "cross" : 'delete'});
                break;
            default:
                this.setState({action: isFront ? "plus" : 'plus'});
                break;
        }
    };

    onPress = async() => {
        if (this.props.user !== null) {
            await this.props.bigButtonEvent(this.state.action);
            this.checkAction();
            // notifyToSocketSyncCardholder(getOwnerCardname(this.props.user, this.props.card.cardname))
        } else {
            console.log("onPress", this.props.language)
            const t = translate[this.props.language];
            // Modal.alert(null, getText(t, "login_first"),
            //     [ { text: getText(t, "ok"), onPress: () => {return false;}, style: 'cancel' }] )
        }
    };

    render() {
        const {user, cardname, isFront, cards} = this.props;
        const color = colors[this.props.theme];

        switch (this.state.action)
        {
            case null:
                return null;
            case "cardholder":
                return <View style={[styles.label, {borderColor: color.cardLines, backgroundColor: color.card}]}>
                    {
                        this.state.owner === "" ? null :
                        <Text style={[styles.textLabel, {color: color.icon}]}>+{this.state.owner}</Text>
                    }
                </View>;
            default:
                return <TouchableOpacity
                    style={[styles.bigButton, {marginRight: isFront ? 15 : 0, borderColor: color.cardLines, backgroundColor: color.card}]}
                    hide={true}
                    underlayColor={color.cardLines}
                    onPress={this.onPress}>
                    <KitIcon name={this.state.action} size={20} color={color.icon}/>
                </TouchableOpacity>
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        friends: state.friends,
        theme: state.theme,
        language: state.language,
        cards: state.cards,
    }
};
export default connect(mapStateToProps)(BigButton)

const styles = StyleSheet.create({
    bigButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginTop: -18,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: 'center',
        zIndex: 9999,
    },
    label: {
        marginTop: -10,
        height: 20,
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 0.5,
        zIndex: 9999,
        borderRadius: 5,
        paddingRight: 5,
        paddingLeft: 5,
        marginRight: 15
    },
    textLabel: {
        fontSize: 10
    }
});

// export const CardView = generateCardView()
