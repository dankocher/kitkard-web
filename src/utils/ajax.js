import {host} from "../constants/api";


const ajax = async (api, data) => {

    return await fetch(getURL(api, data), getParams(api.method, data))
        .then(res => res.json())
        .then(async res => { return res})
        .catch((e) => {
            console.log(e);
            return {ok: false, status: "unreachable"}
        });
};

export default ajax;

const getURL = (api, data) => {
    let url = host.uri + api.uri;

    for (const param in data) {
        url = url.replace(":"+param, data[param])
    }

    return url;
};

const getParams = (method, data) => {
    if(method === "POST" || method === "PUT" || method === "DELETE" || data == null) {
        return ({
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
            credentials: 'include',
            body: JSON.stringify(data),
        })
    } else {
        return ({
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
            credentials: 'include'
        })
    }
};
