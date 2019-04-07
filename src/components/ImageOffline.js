import React from 'react';
import  {host} from '../constants/api';
// import {OfflineImage} from "react-native-image-offline";

class ImageOffline extends React.Component {
    constructor(props) {
        super(props);

        const defaultPic = this.props.alpha === false ? "/assets/images/logo_round_white.png"
                            : this.props.rounded === true ? ("/assets/images/logo_round_gray.png") : ("/assets/images/logo_gray.png");
        this.state = {
            key: "default",
            source: defaultPic,
            defaultPic: defaultPic
        }
    }

    getSize(props) {
        if (isNaN(props.size)) {
            let size = parseInt(props.size);
            if (size <= 100) return 's';
            else return 'm';
        } else {
            switch (props.size) {
                case "long": case "l": case "big": return "l";
                case "small": case 's': return "s";
                case "medium": case "m": default: return "m";
            }
        }
    }

    componentWillMount() {
        this.getPicture(this.props);
    }

    componentWillReceiveProps(nexProps) {
        this.getPicture(nexProps);
    }

    async getPicture(nexProps) {

        if (this.props.alpha === false) {
            this.setState({
                defaultPic: ("/assets/images/logo_round_white.png")
            })
        } else if (this.props.rounded) {
        } else {
            this.setState({
                defaultPic: ("/assets/images/logo_gray.png")
            })
        }

        let pictureId = await this.getPictureId(nexProps);

        let size = this.getSize(nexProps);

        if (pictureId !== null && pictureId !== undefined) {
                let source = "/pic/" + size + "/" + pictureId;
                let url = host.uri + source;

                this.setState({
                    key: url,
                    source: url
                });

        } else {
            this.setState({
                key: 'default',
                source: this.state.defaultPic
            });
        }
    }

    async getPictureId(props) {

        if (props.card !== undefined) {
            let pictures = props.card.pictures;
            if (pictures === undefined ||
                pictures.length === 0 || pictures[0] === "default") {
                return null;
            } else {
                return pictures[0];
            }
        } else return null;
    }


    render() {
        let style = this.props.style;
        return (
        <span style={[defaultStyles.container, style]}>
            {
                // this.state.key === 'default' ?
                    <img alt={this.state.key} src={this.state.source} style={style}/>
                    // :
                    // <OfflineImage
                    //     key={this.state.key}
                    //     style={ style }
                    //     fallbackSource={ this.state.defaultPic }
                    //     source={ this.state.source }
                    // />
            }

        </span>
        )
    }
}

export default (ImageOffline)


const defaultStyles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden'
    }
};

