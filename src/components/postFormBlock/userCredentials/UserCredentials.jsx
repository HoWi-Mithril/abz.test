import './userCredentials.scss'
import MyInputComponent from "./myInputComponent/MyInputComponent";

const UserCredentials = ({inputFields, formErrors, handleChange}) => {
    return (
        <div className={'user-data'}>
            {Object.keys(inputFields).map(
                inputName => (
                    <MyInputComponent
                        key={inputFields[inputName].name}
                        handleChange={handleChange}
                        errorMessage={formErrors[inputFields[inputName].name]}
                        {...inputFields[inputName]}
                    />
                )
            )}
        </div>
    );
};

export default UserCredentials;