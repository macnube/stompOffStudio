import { createContext } from 'react';

const UserAuthContext = createContext({ user: {}, setUser: () => {} });

export default UserAuthContext;
