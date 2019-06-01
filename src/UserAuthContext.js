import React, { createContext, useState } from 'react';

const UserAuthContext = createContext({ user: {}, setUser: () => {} });

export default UserAuthContext;
