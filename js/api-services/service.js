async function api(url, params, method) {
    return await axios({
        url: url + "?query=" + params,
        method,
    });
}

async function postApi(url, body) {
    return await axios.post(url, body)
}