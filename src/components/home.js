import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthUserContext } from '../context/authUserContext';
import { TeamContext } from '../context/teamContext';
import Login from './login';

const Cookies = require('js-cookie');

const Home = () => {
	const {
		authUser,
		authUserID,
		setAuthUser,
		setAuthUserID,
		authUserTeams,
		setAuthUserTeams,
		refresh,
		setRefresh,
	} = useContext(AuthUserContext);
	const {
		teamID,
		newTeamName,
		newTeamID,
		setTeamID,
		teamObj,
		setTeamObj,
	} = useContext(TeamContext);

	const setObj = () => {
		let tableObj = [];
		for (let i = 0; i < authUserTeams.length; i++) {
			tableObj.push({
				authUserTeams: authUserTeams[i],
				teamID: teamID[i],
			});
		}
		setTeamObj({ tableObj });
		console.log(teamObj);
	};

	useEffect(() => {
		if (!authUser || !refresh) {
			const accessToken = Cookies.get('accessToken');
			const requestObj = {
				accessToken: accessToken,
			};
			axios
				.post('http://localhost:3009/login/detectUser', requestObj)
				.then((res) => {
					console.log(res);
					setAuthUser(res.data.username);
					setAuthUserID(res.data.id);
				})
				.catch((err) => {
					console.log(`Error: ${err}`);
				});
		}

		if (authUserID && refresh) {
			axios
				.get('http://localhost:3008/users/' + authUserID)
				.then((res) => {
					console.log(res);
					setAuthUserTeams(res.data.teams);
					setTeamID(res.data.teamID);
					setObj();
				})
				.catch((err) => console.log(err));

			setRefresh(false);
		}
	}, [
		authUser,
		setAuthUser,
		authUserID,
		setAuthUserID,
		setAuthUserTeams,
		refresh,
		setRefresh,
		newTeamName,
		newTeamID,
		setTeamID,
	]);

	if (authUser) {
		return (
			<div>
				<br />
				<br />
				<br />

				<h1 className='text-center display-1'>Home</h1>
				<h6 className='text-center'> Welcome {authUser}</h6>
				<h6 className='text-center'>User ID: {authUserID}</h6>
				<h6 className='text-center'>refresh: {refresh ? 'true' : 'false'}</h6>
				<h6 className='text-center'>newTeamName: {newTeamName}</h6>
				<h6 className='text-center'>newTeamID: {newTeamID}</h6>
			</div>
		);
	} else {
		return <Login />;
	}
};

export default Home;
