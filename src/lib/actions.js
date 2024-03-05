import {getCacheToken, setCacheToken, deleteCacheToken, getFormData} from './helpers'

const POSITION_API = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';
const USER_API = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6';
const TOKEN_API = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';
const USER_POST_API = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';

const takeTime = async () => {
    await new Promise(res => {
        setTimeout(()=>{
            res();
        }, 99000)
    })
}

export const fetchData = async (link) => {
    //await takeTime()
    try {
        const response = await fetch(link);
        return await response.json();
    } catch (err) {
        console.error('Request error: ', err);
    }
}

export const getInitialUsersList = async () => {
    return fetchData(USER_API);
}

export const getUsersPositionList = async () => {
    return fetchData(POSITION_API);
}

const getToken = async () => {
    const tokenFromCache = getCacheToken();

    if (tokenFromCache) {
        return {token: tokenFromCache};
    }

    const freshToken = await fetchData(TOKEN_API);
    setCacheToken(freshToken);

    return freshToken;
}

export const postUser = async (userData) => {
    const formData = getFormData(userData);
    const {token} = await getToken();

    try {
        const response = await fetch(USER_POST_API, { method: 'POST', body: formData, headers: { 'Token': token }});
        const responseData = await response.json();

        if (responseData.success) {
            deleteCacheToken();
        } else {
            console.error(responseData.message);

            if (responseData.message.includes('token')) {
                deleteCacheToken();
            }
        }

        return responseData;
    } catch (err) {
        console.error('Request error: ', err);
    }
}