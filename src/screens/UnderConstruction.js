import React, { Component } from 'react';
import detectBrowserLanguage from 'detect-browser-language'
require('../styles/UnderContruction.scss');

class UnderConstruction extends Component {

    state = {
        userLanguage: ""
    };

    componentDidMount() {
        let language = detectBrowserLanguage();
        language = language.split("-")[0];
        // var language = window.navigator.language || window.navigator.userLanguage;
        if (language !== 'ru')
            language = 'en';
        this.setState({ userLanguage: language })
    }

    getGooglePlayButton = () => {
        return this.state.userLanguage === 'ru' ?
            <a href='https://play.google.com/store/apps/details?id=com.kitkard&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Доступно в Google Play' src='/images/ru_badge_web_generic.png'/></a>
            :
            <a href='https://play.google.com/store/apps/details?id=com.kitkard&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='/images/en_badge_web_generic.png'/></a>
        ;
    };

    getApplePlayButton = () => {
        return this.state.userLanguage === 'ru' ?
            <a href='https://itunes.apple.com/by/app/kitkard/id1286872072'><img alt='Загрузите в App Store' src='/images/download_on_app_store_ru.svg'/></a>
            :
            <a href='https://itunes.apple.com/by/app/kitkard/id1286872072'><img alt='Download on The App Store' src='/images/download_on_app_store_en.svg'/></a>
        ;
    };

    render() {

        const { userLanguage } = this.state;

        const translation = text[userLanguage];

        return (
            <div className="welcome">
                <div className="background"/>
                { this.state.userLanguage === "" ? null :
                    <div className="form">
                        <div className="kitkard-logo"/>
                        <h1 className="under-construction">{translation.site_under_construction}</h1>
                        <h2 className="tray-later">{translation.try_again_later}</h2>
                        <h2 className="install-app">{translation.install_our_app}</h2>
                        <div className="apps">
                            <div className="google">
                                {
                                    this.getGooglePlayButton()
                                }
                            </div>
                            <div className="apple">
                                {
                                    this.getApplePlayButton()
                                }
                            </div>

                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default UnderConstruction;


const text = {
    ru: {
        site_under_construction: "САЙТ НАХОДИТСЯ В РАЗРАБОТКЕ",
        try_again_later: "Попробуйте зайти позднее",
        install_our_app: "Устанавливайте наше приложение",
    },
    en: {
        site_under_construction: "SITE UNDER CONSTRUCTION",
        try_again_later: "Try again later",
        install_our_app: "Install our app",
    }
};
