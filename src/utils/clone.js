const clone = async (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

export default clone;