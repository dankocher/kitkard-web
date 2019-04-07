import React, {Component} from 'react';
import renderHTML from 'react-render-html';
import ajax from "../utils/ajax";
import {api} from "../constants/api";
import detectBrowserLanguage from "detect-browser-language";
import ScrollView from "../components/ScrollView";

import '../styles/Document.scss';
import KitIcon from "../components/KitIcon";

class Document extends Component {

    state = {
        content: "<div></div>"
    };

    componentDidMount() {
        this.loadDocument();
    }

    async loadDocument() {
        let language = detectBrowserLanguage();
        language = language.split("-")[0];
        if (language !== 'ru')
            language = 'en';
        let res = await ajax(api.doc, {doc: this.props.document, lang: language});

        if (res.ok) {
            this.setState({content: res.html});
        }
    }

    render() {

        return <div className="document">
            <div className='header'>
                <div className="max-content">
                <a href="/" className='logo'>
                    <KitIcon name="my_cards" size={36} color={"white"}/>
                    <span className={"home-icon"} />
                    <img src={"/assets/images/kitkard_white.png"} alt={"kitkard"} style={{height: 32}}/>
                </a>
                </div>
            </div>

            <ScrollView style={{backgroundColor: 'white'}}>
                <div className="doc-content">
                    <div className="max-content">
                    {
                        renderHTML(this.state.content)
                    }
                    </div>
                </div>
            </ScrollView>
        </div>
    }
}

export default Document;