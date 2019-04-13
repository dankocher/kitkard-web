import React from 'react';
import {StyleSheet, Dimensions, Platform, View, Image, TouchableOpacity, StatusBar} from 'react-native';
// import Modal from "react-native-modal";

import colors from '../constants/colors';
import { connect } from 'react-redux';
// import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'
import {host} from '../constants/api'

import {KitIcon} from "./KitIcon";
// import {OfflineImage} from "react-native-image-offline";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("screen").height;
// const deviceHeight = Platform.OS === "ios"
//     ? Dimensions.get("window").height
//     : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
class PicturesModal extends React.Component {

    // _renderIndicator () {
    //     return (
    //         <PagerDotIndicator
    //             pageCount={this.props.card !== undefined && this.props.card.pictures !== undefined || this.props.card.pictures.length > 1 ? this.props.card.pictures.length : 0}
    //             style={{bottom: 5}}
    //             dotStyle={{backgroundColor: '#AFAFAF88'}}
    //             selectedDotStyle={{backgroundColor: colors.light.primary}}
    //         />
    //     )
    // }

    _renderPictures() {
        var picturesPager = [];
        let pictures = this.props.card.pictures;
        if (pictures !== undefined) {
            for (const p of pictures) {
                const url = {uri: host.uri + "/pic/l/" + p};
                // console.log(url);
                picturesPager.push(
                    <View style={styles.pictureView} key={p}>
                        <Image style={styles.picture} source={url}/>
                        {/*<OfflineImage*/}
                            {/*key={url.uri}*/}
                            {/*style={ styles.picture }*/}
                            {/*fallbackSource={ require("../assets/images/logo_gray.png") }*/}
                            {/*source={ url }*/}
                        {/*/>*/}
                    </View>
                )
            }
        }
        // console.log(pictures);
        return (
            picturesPager
        );
    }

    render() {
        const {card, user} = this.props;
        return (
            null
            // <Modal
            //     style={styles.modal}
            //     animationIn='zoomIn'
            //     animationOut='zoomOut'
            //     isVisible={this.props.showPictures}
            //     backdropColor='black'
            //     useNativeDriver={true}
            //     transparent={true}
            //     backdropOpacity={1}
            //     deviceHeight={deviceHeight}
            //     deviceWidth={deviceWidth}
            //     onRequestClose={() => { console.log('Modal has been closed.'); }}
            //     onBackButtonPress={() => this.props.onClosePictures()}
            //     onBackdropPress={() => this.props.onClosePictures()}
            //     // swipeDirection="up"
            //     // onSwipe={() => this.props.onClosePictures()}
            //     presentationStyle="overFullScreen"
            // >
            //     {/*<StatusBar barStyle='light-content' backgroundColor='#053120'/>*/}
            //     <StatusBar barStyle='light-content' backgroundColor='black'/>
            //     <IndicatorViewPager
            //         ref={(pagerView) => {this.pagerView = pagerView;}}
            //         style={{backgroundColor: 'transparent', flex: 1}}
            //         indicator={this._renderIndicator()}
            //     >
            //         {this._renderPictures()}
            //     </IndicatorViewPager>
            //     <TouchableOpacity onPress={() => this.props.onClosePictures()}>
            //         <View style={styles.buttonClose}>
            //             <KitIcon style={styles.iconClose} name="cross" color="white" size={25}/>
            //         </View>
            //     </TouchableOpacity>
            // </Modal>
        );
    }

};

const mapStateToProps = state => {
    return {
        user: state.user,
        cards: state.cards,
        theme: state.theme
    }
};
export default connect(mapStateToProps)(PicturesModal)

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
    modal: {
        // backgroundColor: 'red',
        // position: 'absolute',
        // top: 0,
        margin: 0,
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'black',
    },
    pictureView: {
        // backgroundColor: 'black',
        // paddingTop: 20,
        // paddingBottom: 20,
        // maxHeight: '90%',
        justifyContent: 'center',
        alignContent: 'center',
        width: width,
        height: width,
    },
    picture: {
        justifyContent: 'center',
        alignContent: 'center',
        width: width,
        height: width,
    },
    buttonClose: {
        width: 50,
        height: 50,
        marginLeft: width / 2 - 25,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    iconClose: {
        // flex: 1,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'green'
    }
});

// export const CardView = generateCardView()
