import React, { Component } from 'react';

import {connect} from "react-redux";
import {setTheme} from "../../redux/actions";
import colors from "../../constants/colors";
import ImageOffline from "../ImageOffline";


class SettingsHeader extends Component {

    render() {
        const {user} = this.props;

        const card = user !== null ? this.props.cards[user.username] : undefined;
        const email = user !== null ? user.email : "";
        const username = user !== null ? '+'+user.username : "";
        return (
            <div style={styles.titleContainer}>
                <div style={styles.titleIconContainer}>
                    <ImageOffline style={{ width: 80, height: 80, borderRadius: 40 }} card={card} size={80} rounder={true} alpha={false}/>
                </div>

                <div style={styles.titleTextContainer}>
                    {
                        card === undefined || card.name === "" ? null :
                        <div style={styles.nameText} >
                            {card.name}
                        </div>
                    }
                    {
                        user === undefined || user === null ? null :
                            <div style={styles.emailText}>
                                {email}
                            </div>
                    }
                    {
                        user === undefined || user === null || user.username === undefined || user.username === "" ? null :
                            <div style={styles.descriptionText}>
                                {username}
                            </div>
                    }
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

const styles = {
    container: {
        flex: 1,
        width: '100%',
        height: 100,
        backgroundColor: colors.light.primary
    },
    titleContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        display: 'inline-flex',
        width: '100%',
        backgroundColor: colors.light.primary
    },
    titleTextContainer: {
        alignItems: 'center',
    },
    titleIconContainer: {
        marginRight: 10,
        paddingTop: 2,
        borderRadius: 40
    },
    nameText: {
        fontWeight: '600',
        fontSize: 18,
        color: 'white',
        textAlign: 'left'
    },
    emailText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'left'
    },
    descriptionText: {
        fontSize: 14,
        marginTop: 5,
        textAlign: 'left',
        color: 'white'
    }
};
