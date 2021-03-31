import React, { useState } from 'react';

export const AuthUserContext = React.createContext();

export const AuthUserProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState('');
	const [authUserID, setAuthUserID] = useState('');
	const [authUserTeams, setAuthUserTeams] = useState([]);
	const [refresh, setRefresh] = useState(false);

	return (
		<AuthUserContext.Provider
			value={{
				authUser,
				setAuthUser,
				authUserID,
				setAuthUserID,
				authUserTeams,
				setAuthUserTeams,
				refresh,
				setRefresh,
			}}
		>
			{children}
		</AuthUserContext.Provider>
	);
};
