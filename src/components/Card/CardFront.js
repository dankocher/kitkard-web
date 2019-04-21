import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Platform, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import colors from '../../constants/colors';
import BottomBar from './BottomBar';

import CloseCardButton from "./CloseCardButton";
import BigButton from "./BigButton";
import {isPrivate} from "../../helpers/isCardholder";
import PicturesModal from "../PicturesModal";

import ImageOffline from "../ImageOffline";
import AspectRatio from "../AspectRatio";

class CardFront extends React.Component {

    constructor(props) {
        super(props);

        this.flip = props.flip;

        this.state = {
            pictureHeight: 0,
            showPictures: false,
            name: null
        }
    }

    componentWillMount() {
        this.getCardName();
    }

    async getCardName() {
        if (this.props.card === undefined ||  await isPrivate(this.props, this.props.cardname)) {
            this.setState({name: null})
        } else {
            this.setState({name: this.props.card.name})
        }
    }

    showImage() {
        // setNavigationColor("dark");
        this.setState({showPictures: true});
    }
    closePictures() {
        this.setState({showPictures: false});
        // setNavigationColor(this.props.theme);
    }

    bigButtonEvent(action) {
        switch(action) {
            case "plus": //add card
                this.props.onAdd();
                break;
            case "cross": // cancel request
                this.props.onCancelRequest();
                break;
        }
    }

    close = () => {
        console.log("close")
    };

    render() {
        const { user, card, theme, cardname } = this.props;
        const color = colors[theme];

        return (
            <View style={[styles.face, {backgroundColor: color.card}]}>
                <View style={[styles.inside]}>

                    <View style={[styles.top, {backgroundColor: color.card, height: this.state.pictureHeight}]}
                        onLayout={(event) => {
                                const {x, y, width, height} = event.nativeEvent.layout;
                                this.setState({ pictureHeight: width })
                            }
                        }>

                        <CloseCardButton cardname={cardname} onClose={this.props.onClose} isModal={this.props.isModal}/>

                        {/*<ImageOffline style={[styles.image, {backgroundColor: color.card}]}*/}
                                      {/*size={'medium'}*/}
                                      {/*card={card}*/}
                            {/*// source={getCardPicture(card, "m")}*/}
                        {/*/>*/}
                        <TouchableOpacity style={styles.imageTouchable}
                            activeOpacity={1}
                            onPress={() => this.showImage()}>
                            {
                                // card.pictures === undefined || card.pictures.length === 0 ?
                                <ImageOffline style={[styles.image, {backgroundColor: color.card}]}
                                              size={'medium'}
                                              card={card}
                                              // source={getCardPicture(card, "m")}
                                />
                                    // <Image style={[styles.image, {backgroundColor: color.card}]} source={getCardPicture(card, "m")}/>
                                    // : <OfflineImage style={[styles.image, {backgroundColor: color.card}]} source={getCardPicture(card, "m")}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.separator, {marginTop: this.state.pictureHeight - 18, opacity: this.state.pictureHeight === 0 ? 0 : 1}]}>
                        <View style={[styles.line, {borderColor: color.cardLines}]}/>
                        <BigButton cardname={cardname} isFront={true} type={this.props.type} bigButtonEvent={(action) => this.bigButtonEvent(action)}/>
                    </View>
                    <View style={styles.middle}>
                        <Text style={[styles.cardname, {color: color.text}]}>{`+${cardname}`}</Text>
                        {
                            this.state.name === null ? null :
                            <Text style={[styles.name, {color: color.text}]}>{card.name}</Text>
                        }
                    </View>

                    {
                        card === undefined ? null :
                        <BottomBar style={styles.bottom}
                                   cardname={cardname}
                                   flip={this.flip}
                                   face="back"
                        />
                    }
                </View>
                {
                    card === undefined || card.pictures === undefined || card.pictures.length === 0 ? null :
                    <PicturesModal
                        showPictures={this.state.showPictures}
                        card={card}
                        onClosePictures={() => this.closePictures()}/>
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
export default connect(mapStateToProps)(CardFront)

const cardRadius = 20;

const styles = StyleSheet.create({
    face: {
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-between',
        aspectRatio: 17 / 27,
        height: '100%',
        flex: 1,
        borderRadius: cardRadius,
        // shadowColor: 'rgba(0,0,0,0.5)',
        // shadowOffset: {
        //     width: 0,
        //     height: 1
        // },
        shadowOpacity: 0.8,
        // elevation: 6,
        boxShadow: '0 1px 8px 0 rgba(0,0,0,0.4)',
        borderWidth: 0,
        overflow: 'hidden'
    },
    inside: {
        flex: 1,
        height: '100%',
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: cardRadius,
        // overflow: Platform.OS === "ios" ? "hidden" : "scroll",
        overflow: 'hidden'
    },
    top: {
        borderTopRightRadius: cardRadius,
        borderTopLeftRadius: cardRadius,
        width: '100%',
        aspectRatio: 1,
    },
    image: {
        borderTopRightRadius: cardRadius,
        borderTopLeftRadius: cardRadius,
        width: '100%',
        height: '100%',
    },
    imageTouchable: {
        borderTopRightRadius: cardRadius,
        borderTopLeftRadius: cardRadius,
        height: '100%'
    },
    middle: {

    },
    bottom: {
        height: 40,
    },
    cardname: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    name: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center'
    },
    separator: {
        position: 'absolute',
        width: '100%',
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        // height: '200%',
        // overflow: 'scroll',
        // marginTop: '-32%'

    },
    line: {
        paddingTop: 18,
        borderBottomWidth: 0.5,
        width: '100%'
        // flex: 1,
    }
});
