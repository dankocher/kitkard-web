import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image, Platform, Animated, Easing, Text, Alert } from 'react-native';
import SortableList from '../SortableList/SortableList'

import {Modal} from 'antd-mobile';

import {KitIcon} from '../../components/KitIcon';
import colors from '../../constants/colors';
import {api, host} from "../../constants/api";
import translation, {tr} from '../../translations';
import ImagePicker from 'react-native-image-crop-picker';
import {syncCard} from "../../helpers/sync";
import ajax from "../../utils/ajax";

// import { syncCard} from "../../helpers/sync";

class EditPicture extends React.Component {

    constructor(props) {
        super(props);
        this.card = this.props.card;
        this.state = {
            visibleModal: false
        };

    }

    hideModal = () => {
        this.setState({visibleModal: false});
    };

    showModal = () => {
        setTimeout(() => {
            this.setState({visibleModal: true});
        }, 100);
    };

    onChangeOrder = async (nextOrder) => {
        let pictures = [];
        for (const i of nextOrder) {
            pictures.push(this.card.pictures[i]);
        }
        this.card.pictures = pictures;
    };
    onReleaseRow = async () => {
        this.card.updated = new Date().getTime();
        await this.props.saveCard(this.card);
        syncCard(this.props, this.card)
    };

    renderModalContent = () => {
        const color = colors[this.props.theme];
        const t = translation[this.props.language];
        return (
            <View style={[styles.modalContent, {backgroundColor: color.background}]}>
                {this.renderButton(t.picture_from_camera, "camera")}
                {this.renderButton(t.picture_from_gallery, "picture")}
            </View>
        )
    };

    renderButton = (text, icon) => {
        const theme = colors[this.props.theme];
        return (
            <TouchableOpacity onPress={() => this.addPicture(icon)}>
                <View style={[styles.button]}>
                    <KitIcon style={styles.buttonIcon} name={icon} size={25} color={theme.text}/>
                    <Text style={[{color: theme.text}]}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    addPicture = (from) => {
        this.setState({visibleModal: false});
        /*
        const theme = colors[this.props.theme];
        switch (from) {
            case "picture":
                ImagePicker.openPicker({
                    width: 500,
                    height: 500,
                    cropping: true,
                    multiple: false,
                    cropperActiveWidgetColor: theme.primary,
                    cropperStatusBarColor: theme.primary,
                    cropperToolbarColor: theme.primary,
                    // cropperTintColor: themes.commons.kitkad,
                }).then(image => {
                    // console.log(image);
                    this.uploadPicture(image);
                }).catch(e => {
                    // console.log(e);
                });
                // CameraRoll.getPhotos({
                //     first: 10000000,
                //     assetType: 'Photos'
                // })
                //     .then(r => {
                //         // this.setState({ photos: r.edges });
                //         this.props.navigation.navigate("Gallery", {cardname: this.card.cardname, pictures: r.edges})
                //     })
                //     .catch((err) => {
                //         //Error Loading Images
                //     });
                break;
            case "camera":
                ImagePicker.openCamera({
                    width: 500,
                    height: 500,
                    cropping: true
                }).then(image => {
                    // console.log(image);
                    this.uploadPicture(image);
                }).catch(e => {
                    // console.log(e);
                });
                break;
            default: break;
        }
        */
    };

    uploadPicture = async (image) => {
        const cardname = this.card.cardname;
        const data = new FormData();
        data.append("picture", {
            uri: image.path,
            type: image.mime,
            name: cardname
        });
        const url = host.uri + "/pic/" + cardname + "/" + "m";
        // console.log(url);
        await fetch(url, {
            method: "PUT",
            // headers: host.headers,
            credentials: 'include',
            body: data
        }).then(res => res.json())
            .then(async res => {
                if (res.status === "ok") {
                    if (this.card.pictures === undefined) {
                        this.card.pictures = [];
                    }

                    this.card.pictures = [res.picture, ...this.card.pictures];
                    await this.props.saveCard(this.card);
                    await this.setState({pictures: this.card.pictures});
                    // syncCard(this.props, this.card);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    _renderRow = ({data, active}) => {
        return <Row data={data} active={active} onDelete={this.onDelete} theme={this.props.theme}/>
    };

    onDelete = async(picture) => {
        const cardname = this.card.cardname;
        const t = translation[this.props.language];
        Alert.alert( null, tr(t.delete_picture_confirmation, {cardname: cardname}),
            [
                {text: t.no, style: 'cancel'},
                {text: t.yes, onPress: async() => {
                        this.setState({spinner: true});
                        await this.deletePicture(picture);
                        this.setState({spinner: false});
                    }},
            ],
            { cancelable: false }
        )
    };

    deletePicture = async(picture) => {

        let res = await ajax(api.delete_picture, {cardname: this.card.cardname, picture: picture});

        if (res.ok) {
            const index = await this.card.pictures.indexOf(picture);
            if (index !== -1) {
                await this.card.pictures.splice(index, 1);
                await this.props.saveCard(this.card);
            }
            return res;
        }
    };

    render() {
        const color = colors[this.props.theme];
        const t = translation[this.props.language];
        return (
            <View style={[styles.container, {borderColor: color.border }]}>
                <SortableList
                    bounces={false}
                    horizontal
                    style={styles.list}
                    onChangeOrder={this.onChangeOrder}
                    onReleaseRow={this.onReleaseRow}
                    contentContainerStyle={styles.contentContainer}
                    data={this.props.card.pictures}
                    renderRow={this._renderRow} />

                <TouchableOpacity style={[styles.buttonAddPicture, {backgroundColor: color.icon}]}
                                  onPress={() => this.showModal()}
                >
                    <KitIcon name='camera' size={20} color='white'/>
                </TouchableOpacity>

                <Modal
                    popup
                    maskClosable
                    visible={this.state.visibleModal}
                    onClose={() => this.hideModal()}
                    animationType="slide-up"
                    afterClose={() => { console.log('afterClose'); }}
                >
                    {this.renderModalContent()}
                </Modal>


                {/*<Modal*/}
                    {/*visible={this.state.visibleModal}*/}
                    {/*swipeDirection='down'*/}
                    {/*onSwipe={this.hideModal}*/}
                    {/*onBackButtonPress={this.hideModal}*/}
                    {/*onBackdropPress={this.hideModal}*/}
                    {/*style={styles.bottomModal}*/}
                {/*>*/}
                    {/*{this.renderModalContent()}*/}
                {/*</Modal>*/}
            </View>
        );
    };
}

export default EditPicture;
    /*
const mapStateToProps = state => {
    return {
        user: state.user,
        theme: state.theme,
        language: state.language,
    }
};
export default connect(mapStateToProps)(EditPicture)
*/

class Row extends React.Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    render() {
        const {data} = this.props;
        const color = colors[this.props.theme];
        return (
            <View style={[ styles.row ]}>
                <Image source={{uri: host.uri + "/pic/s/" + data}} style={[styles.image]} />
                <TouchableOpacity style={styles.buttonDelete} onPress={() => this.props.onDelete(data)}>
                    <KitIcon name='delete' size={20} color='white'/>
                </TouchableOpacity>
            </View>
        );
    }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderBottomWidth: 1
    },
    list: {
        height: 150,
        minWidth: width,
        justifyContent: 'center',
        alignItems: 'center',
    },

    contentContainer: {
        height: 150,
        paddingTop: 15,
        margin: 0,
        // minWidth: width,
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    row: {
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: 'red',
        // width: 150,
        height: 120,
        marginRight: 10,
        // height: 120,
        borderRadius: 4,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: {height: 2, width: 2},
                shadowRadius: 2,
            },

            android: {
                elevation: 0,
                // marginHorizontal: 30,
            },
        })

    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 5,
    },
    buttonDelete: {
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -32
    },
    buttonAddPicture: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: 10,
        borderRadius: 20,
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
        width: '100%',
    },
    modalContent: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        width: '100%',
        borderColor: "rgba(0, 0, 0, 0.1)",
        paddingTop: 10,
        paddingBottom: 10
        // ...ifIphoneX({
        //     paddingBottom: 40
        // }, {
        //     paddingBottom: 10
        // }),
    },
    button: {
        backgroundColor: "transparent",
        width: width,
        height: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    buttonIcon: {
        paddingHorizontal: 15
    }
});
