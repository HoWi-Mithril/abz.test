import './_postFormBlock.scss'
import {useEffect, useRef, useState} from "react";
import UserCredentials from "./userCredentials/UserCredentials";
import UploadPhoto from "./uploadPhoto/uploadPhoto";
import SubmitButton from "./submitButton/SubmitButton";
import PositionList from "./positionList/PositionList";
import {formValidation, isValueAdded} from "../../lib/formValidation";
import { postUser } from "../../lib/actions";
import {getDeepCopyForm, getFormDataFromState, parseErrorResponse} from "../../lib/helpers";

const initialInputFields = {
    userData: {
        name: {
            type: 'text',
            name: 'name',
            label: 'Your name',
            value: '',
            exampleMessage: false,
        },
        email: {
            type: 'email',
            name: 'email',
            label: 'Email',
            value: '',
            exampleMessage: false,
        },
        phone: {
            type: 'tel',
            name: 'phone',
            label: 'Phone',
            value: '',
            exampleMessage: '+38 (XXX) XXX - XX - XX',
        }
    },
    position_id: 0,
    file: null
};

const PostFormBlock = ({updateUserList}) => {
    /* Handle inputs */
    const [inputFields, setInputFields] = useState(initialInputFields);
    const handleUserDataChange = (e) => {
        const updatedInputFields = getDeepCopyForm(inputFields);
        updatedInputFields.userData[e.target.name].value = e.target.value;

        setInputFields(updatedInputFields);
    };

    const handlePositionChange = (e) => {
        const updatedInputFields = getDeepCopyForm(inputFields);
        updatedInputFields.position_id = Number(e.target.value);

        setInputFields(updatedInputFields);
    }

    const handleFileChange = (e) => {
        const updatedInputFields = getDeepCopyForm(inputFields);
        updatedInputFields.file = e.target.files[0];

        setInputFields(updatedInputFields);
    };

    /* Handle submit button */
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        setIsDisabled(!isValueAdded(inputFields));
    }, [inputFields]);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const inputFieldsData = getFormDataFromState(inputFields);
        const formErrors = formValidation(inputFieldsData);

        setFormErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            sendUserData(inputFieldsData);
        } else {
            setIsLoading(false);
        }
    }
    const sendUserData = (userData) => {
        postUser(userData).then( res => {
            if (res.success) {
                updateUserList();
                resetForm();
            } else {
                setFormErrors(parseErrorResponse(res));
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }

    /* Handle errors */
    const [formErrors, setFormErrors] = useState({});

    /* Reset Form data */
    const resetForm = () => {
        setInputFields(initialInputFields);
        setFormErrors({});
        clearInputPhoto.current.value = "";
    }

    /* Handle loader */
    const [isLoading, setIsLoading] = useState(false);

    /* Handle clear input file */
    const clearInputPhoto = useRef(null);

    return (
        <section className={'section-post section'} id={'sign-up'}>
            <h2 className={'title'}>Working with POST request</h2>

            <form onSubmit={handleSubmitForm} className={'form'}>
                <UserCredentials inputFields={inputFields.userData}
                                 formErrors={formErrors}
                                 handleChange={handleUserDataChange}/>

                <PositionList handlePositionChange={handlePositionChange}
                              selectedId={inputFields.position_id}
                              posError={formErrors.position_id}/>

                <UploadPhoto handleFileChange={handleFileChange}
                             selectedFile={inputFields.file}
                             ref={clearInputPhoto}
                             photoError={formErrors.photo}/>

                <SubmitButton isLoading={isLoading} isDisabled={isDisabled}/>
            </form>
        </section>
    );
};

export default PostFormBlock;