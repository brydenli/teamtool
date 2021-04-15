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
	const [teamName, setTeamName] = useState('');

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
				teamName,
				setTeamName,
			}}
		>
			{children}
		</TeamContext.Provider>
	);
};
