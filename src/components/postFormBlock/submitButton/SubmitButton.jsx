import './_subnitButton.scss'
import Loading from "../../loading/Loading";

const SubmitButton = ({isLoading, isDisabled }) => {
    return (
        isLoading ? (
            <div className={'submit-loader'}>
                <Loading />
            </div>
        ) : (
            <button type="submit"
                    className={'submit-button primary-button'}
                    disabled={isDisabled}>
                Sign up
            </button>
        )
    );
};

export default SubmitButton;