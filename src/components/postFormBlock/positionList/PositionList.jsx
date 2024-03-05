import "./_positionList.scss"
import {useEffect, useState} from "react";
import {getUsersPositionList} from "../../../lib/actions";
import Loading from "../../loading/Loading";

const PositionList = ({handlePositionChange, selectedId, posError}) => {
    useEffect(() => {
        getUsersPositionList().then(data => {
            if (data.success && data.positions.length) {
                setPositionList(data.positions);
            }
        }).finally(() => {
            setShowLoader(false);
        });
    }, []);

    const [positionList, setPositionList] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    return (
        <div className={'position-choose user-data-wrapper ' + (posError ? ' _error' : '')}>
            <h3>Select your position</h3>

            {showLoader && <Loading/>}

            {positionList.map(position => (
                <label key={position.id}>{position.name}
                    <input type="radio"
                           name={'position'}
                           value={position.id}
                           onChange={handlePositionChange}
                           checked={position.id === selectedId}
                    />
                    <div className="checkmark"></div>
                </label>
            ))}

            <div className={'message'}>
                {posError}
            </div>
        </div>
    );
};

export default PositionList;