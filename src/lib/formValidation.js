const nameMinLength = 2,
    nameMaxLength = 60,
    emailMinLength = 2,
    emailMaxLength = 100,
    emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    phonePattern = /^[\+]{0,1}380([0-9]{9})$/,
    positionMinId = 1,
    photoSize = 5;

// Check is form data valid
export const formValidation = (data) => {
    let errors = {};

    /*Name validation rules*/
    if (data.name.trim().length < nameMinLength) {
        errors.name = "Name is too short";
    }

    if (nameMaxLength < data.name.trim().length) {
        errors.name = "Name is too long";
    }

    /*Email validation rules*/
    if (data.email?.length < emailMinLength) {
        errors.email = "Email is too short";
    }

    if (emailMaxLength < data.email.length) {
        errors.email = "Email is too long";
    }

    if (!emailPattern.test(data.email)) {
        errors.email = "Incorrect email";
    }

    /*Phone validations rules*/
    if (!phonePattern.test(data.phone)) {
        errors.phone = "Incorrect phone number";
    }

    /*Position validation rules*/
    if (data.position_id < positionMinId) {
        errors.position_id = "Select position";
    }

    /*Photo file validation rules*/
    if (!data.file) {
        errors.file = "Select file";
    }

    if (data.file && (photoSize < (data.file.size / 1024 / 1024))) {
        errors.file = "Incorrect file size";
    }

    return errors;
}

// Check is all values added for UserData form
export const isValueAdded = (formData) => {
    const isUserData = Object.values(formData.userData).every( el => !!(el.value.trim()));

    return isUserData && !!formData.position_id && !!formData.file;
}