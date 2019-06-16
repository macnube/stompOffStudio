import React, { useContext } from 'react';
import UserAuthContext from './UserAuthContext';

const withUser = WrappedComponent => props => {
    const { user, setUser } = useContext(UserAuthContext);
    return <WrappedComponent {...props} user={user} setUser={setUser} />;
};

export default withUser;
