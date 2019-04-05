export const LongToDate = (milliseconds, language) => {
    const current_date = new Date();
    const current_year = current_date.getFullYear();
    const current_month = current_date.getMonth();
    const current_day = current_date.getDate();

    const date = new Date(milliseconds);
    // return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    // TODO: Fix date
    const w = weekday[language][date.getDay()];
    const m = date.getMonth();

    const day = date.getDate();
    const month = months[language][m];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();

    let time = `${hours}:${minutes}`;

    let meridian = "AM";
    if (language === 'en') {
        if (hours > 12) {
            hours = hours - 12;
            meridian = 'PM';
        }
        time = `${hours}:${minutes} ${meridian}`;
    }

    if (year === current_year && m === current_month && day === current_day) {  //TODAY
        switch (language) {
            default: case "en": return `today at ${time}`;
            case "es": return `hoy a las ${time}`;
            case "ru": return `сегодня в ${time}`;
        }
    } else
    if (year === current_year && m === current_month && day === current_day - 1) {  //YESTERDAY
        switch (language) {
            default: case "en": return `yesterday at ${time}`;
            case "es": return `ayer a las ${time}`;
            case "ru": return `вчера в ${time}`;
        }
    } else
    if (year === current_year && m === current_month && day >= current_day - 3) {  // 2 - 3 DAYS AGO
        switch (language) {
            default: case "en": return `${w} at ${time}`;
            case "es": return `${w}. a las ${time}`;
            case "ru": return `${w} в ${time}`;
        }
    } else
    if (year === current_year) {
        switch (language) {
            default: case "en": return `${month} ${day} at ${time}`;
            case "es": return `${day} ${month}. a las ${time}`;
            case "ru": return `${day} ${month}. в ${time}`;
        }
    } else {
        switch (language) {
            default: case "en": return `${month} ${day}, ${year} at ${time}`;
            case "es": return `${day} ${month}. ${year} a las ${time}`;
            case "ru": return `${day} ${month}. ${year} г. в ${time}`;
        }
    }
};

const weekday = {
    en : ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    es : ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
    ru : ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
};
const months = {
    en : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    es : ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    ru : ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек']
};
