import React, { useState } from 'react';

export const TeamContext = React.createContext();

export const TeamContextProvider = ({ children }) => {
	const [newTeamName, setNewTeamName] = useState('');
	const [newTeamID, setNewTeamID] = useState('');
	const [teamID, setTeamID] = useState([]);
	const [teamAdmin, setTeamAdmin] = useState([]);
	const [teamMembers, setTeamMembers] = useState([]);
	const [teamObj, setTeamObj] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState([]);

	return (
		<TeamContext.Provider
			value={{
				newTeamName,
				setNewTeamName,
				newTeamID,
				setNewTeamID,
				teamID,
				setTeamID,
				teamAdmin,
				setTeamAdmin,
				teamMembers,
				setTeamMembers,
				teamObj,
				setTeamObj,
				selectedTeam,
				setSelectedTeam,
			}}
		>
			{children}
		</TeamContext.Provider>
	);
};
//team ID should be held in the user -> how to change model and routes to get team IDs?
//teamContext is to hold the team state of the application at the global level
//This well help team functionalities work without having to figure out which team we're trying to speak to for each request
