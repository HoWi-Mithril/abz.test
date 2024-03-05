import './loading.scss'
import loader from '../../assets/loader.svg'

const Loading = () => {
    return (
        <div className={'loader-wrapper rotating'}>
            <img src={loader} alt="loader" />
        </div>
    );
};

export default Loading;