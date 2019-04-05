const getValueOrDefault = (value, def) => {
    if (value === undefined || value === null || value === '' || value === 'none') {
        return def;
    }
    return value;
};

export default getValueOrDefault;