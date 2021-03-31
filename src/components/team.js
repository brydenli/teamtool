import React, { useContext, useEffect } from 'react';
import { TeamContext } from '../context/teamContext';

const Team = () => {
	const { selectedTeam } = useContext(TeamContext);

	useEffect(() => {
		//need to verify that user is authorized to view page
		//^ do this by checking if teamID is in user's teamID array -> need a new route for this users.route
	});

	return (
		<div>
			<h6>selected team: {selectedTeam.teamObj.teamName}</h6>
		</div>
	);
};

export default Team;
