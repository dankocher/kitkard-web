import en from './en.json';
import es from './es.json';
import ru from './ru.json';

const translate = {
    en: en,
    ru: ru,
    es: es,
};

export default translate;

export const tr = (alias, params) => {
    let text = alias;
    if (params !== undefined) {
        for (const p in params) {
            text = text.replace("{{" + p + "}}", params[p]);
        }
    }
    if (text !== undefined && text !== "") {
        return text;
    } else {
        console.log(alias);
        return alias
    }
};

export const getText = (t, alias, params) => {
    if (t !== undefined && t[alias] !== undefined) {
        return tr(t[alias], params);
    } else {
        console.log(alias);
        return alias;
    }
};