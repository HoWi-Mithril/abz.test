import Banner from "../banner/Banner";
import UsersListBlock from "../usersListBlock/UsersListBlock";
import PostFormBlock from "../postFormBlock/PostFormBlock";
import {useEffect, useState} from "react";
import {fetchData, getInitialUsersList} from "../../lib/actions";

const MainContent = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        updateUserList();
    }, []);

    const handleLoadMoreUsers = () => {
        if (!!nextLink) {
            setIsLoading(true);
            fetchData(nextLink).then(responseData => {
                if (responseData.success) {
                    setUserList([...userList, ...responseData.users])
                    setNextLink(responseData.links?.next_url);
                }
            }).finally(() => {
                setIsLoading(false);
            })
        }
    };

    const [nextLink, setNextLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const updateUserList = () => {
        getInitialUsersList().then(responseData => {
            if (responseData.success) {
                setUserList(responseData.users);
                setNextLink(responseData.links?.next_url);
            }
        })
    };

    return (
        <main className="main">
            <Banner/>
            <UsersListBlock userList={userList}
                            isMoreUsers={!!nextLink}
                            handleLoadMoreUsers={handleLoadMoreUsers}
                            isLoading={isLoading}
            />
            <PostFormBlock updateUserList={updateUserList} />
        </main>
    );
};

export default MainContent;