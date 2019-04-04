import React, { Component, Fragment } from 'react';

import {connect} from "react-redux";
import {setTheme} from "../../redux/actions";
import colors from "../../constants/colors";
// import ImageOffline from "../ImageOffline";
// import KitIcon from "KitIcon";


class SettingsHeader extends Component {

    render() {
        const {theme, user} = this.props;
        const color = colors[theme];

        const card = user !== null ? this.props.cards[user.username] : undefined;
        const email = user !== null ? user.email : "";
        const username = user !== null ? '+'+user.username : "";
        return (
            <div style={[styles.titleContainer, {backgroundColor: color.primary}]}>
                <div style={styles.titleIconContainer}>
                    {/*<AppIconPreview iconUrl={card.pictures[0]}/>*/}
                    {/*<ImageOffline style={{ width: 80, height: 80, borderRadius: 40 }} card={card} size={80} rounder={true} alpha={false}/>*/}
                </div>

                <div style={styles.titleTextContainer}>
                    {
                        card === undefined || card.name === "" ? null :
                        <span style={styles.nameText} numberOfLines={1}>
                            {card.name}
                        </span>
                    }
                    <span style={styles.emailText} numberOfLines={1}>
                        {email}
                    </span>

                    <span style={styles.descriptionText}>
                        {username}
                    </span>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user,
    cards: state.cards,
    theme: state.theme,
    screen: state.screen,
});

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsHeader)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 100,
    },
    titleContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleIconContainer: {
        marginRight: 10,
        paddingTop: 2,
        borderRadius: 40
    },
    nameText: {
        fontWeight: '600',
        fontSize: 18,
        color: 'white'
    },
    emailText: {
        color: 'white',
        fontSize: 14
    },
    descriptionText: {
        fontSize: 14,
        marginTop: 5,
        color: 'white'
    }
});
