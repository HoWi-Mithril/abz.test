import "./_myInputComponent.scss"

const MyInputComponent = ({type, name, label, errorMessage, exampleMessage, value, handleChange}) => {
    return (
        <div className={'user-data-wrapper ' + (errorMessage ? ' _error' : '')}>
            <div className={'input-wrapper ' + (value ? '_active' : '')}>
                <input type={type} name={name}
                       id={`user-data-${name}`}
                       value={value}
                       onChange={handleChange} />
                <label htmlFor={`user-data-${name}`}>{label}</label>
            </div>

            <div className={'message'}>
                {errorMessage ? errorMessage : exampleMessage}
            </div>
        </div>
    );
};

export default MyInputComponent;