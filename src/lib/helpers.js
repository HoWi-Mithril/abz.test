/* Token Cache */
export const cacheToken = {
    token: null,
    time: 0,
    validTokenTimeMillSec: 39 * 60 * 1000
}

export const getCacheToken = () => {
    const isValidTime = (Date.now() - cacheToken.time) < cacheToken.validTokenTimeMillSec;
    if (cacheToken.token && isValidTime) {
        return cacheToken.token
    }

    deleteCacheToken();
    return false;
}

export const setCacheToken = (freshToken) => {
    cacheToken.token = freshToken.token;
    cacheToken.time = Date.now();
}

export const deleteCacheToken = () => {
    cacheToken.token = null;
    cacheToken.time = 0;
}

export const getFormData = (userData) => {
    const formData = new FormData();
    formData.append('position_id', userData.position_id);
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('photo', userData.file);
    return formData;
}

export const getFormDataFromState = (inputsState) => {
    return {
        name: inputsState.userData['name'].value,
        email: inputsState.userData['email'].value,
        phone: inputsState.userData['phone'].value,
        position_id: inputsState.position_id,
        file: inputsState.file
    };
}

export const parseErrorResponse = (res) => {
    let errors = {};

    if (res.message.includes('phone or email already exist')) {
        errors.phone = res.message;
        errors.email = res.message;
    }

    if (res.message === 'Validation failed') {
        errors = {...errors, ...Object.fromEntries(Object.entries(res.fails).map( ([name, mess]) => [name, mess[0]]))};
    }

    return errors;
}

export const getDeepCopyForm = (obj) => {
    const copy = JSON.parse(JSON.stringify(obj));
    if (obj.file) {
        copy.file = obj.file;
    }

    return copy;
}

export const phoneFormat = (phone) => {
    if (phone.includes("+")) {
        phone = phone.split('').slice(phone.indexOf('+') + 1).join('');
    }

    return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,'+$1 ($2) $3 $4 $5');
}