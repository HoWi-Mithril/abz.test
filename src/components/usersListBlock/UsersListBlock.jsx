import './_userListBlock.scss';
import UserCard from "./userCard/UserCard";
import Loading from "../loading/Loading";

const UsersListBlock = ({userList, isMoreUsers, handleLoadMoreUsers, isLoading}) => {
    return (
        <section className={'section-get section'} id={'users'}>
            <h2 className={'title'}>Working with GET request</h2>

            {
                userList.length > 0 ? (
                    <div className={'user-list'}>
                        {userList.map(user => <UserCard key={user.id} {...user}/>)}
                    </div>
                ) : <Loading/>
            }

            {isMoreUsers && <button onClick={handleLoadMoreUsers}
                                   className={'show-more primary-button'}
                                   disabled={isLoading}>Show more</button>}
        </section>
    );
};

export default UsersListBlock;