import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthUserContext } from '../context/authUserContext';
import { TeamContext } from '../context/teamContext';
const Cookies = require('js-cookie');

const Team_Main = () => {
	let history = useHistory();
	const [isMounted, setIsMounted] = useState(false);
	const [loading, setLoading] = useState(true);

	const {
		authUser,
		setAuthUser,
		authUserID,
		setAuthUserID,
		authUserTeams,
		setAuthUserTeams,
		refresh,
		setRefresh,
	} = useContext(AuthUserContext);
	const {
		teamID,
		setTeamID,
		teamAdmin,
		teamObj,
		setTeamObj,
		selectedTeam,
		setSelectedTeam,
	} = useContext(TeamContext);

	const setObj = () => {
		let tableObj = [];
		if (authUserTeams && teamID) {
			for (let i = 0; i < authUserTeams.length; i++) {
				tableObj.push({
					authUserTeams: authUserTeams[i],
					teamID: teamID[i],
				});
			}
		} else {
			setLoading(false);
		}

		setTeamObj({ tableObj });
		console.log(teamObj);
	};

	useEffect(() => {
		if (!isMounted) {
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
			setIsMounted(true);
			setRefresh(true);
		}
	}, [
		authUser,
		setAuthUser,
		setAuthUserID,
		setAuthUserTeams,
		refresh,
		setRefresh,
		isMounted,
	]);
	useLayoutEffect(() => {
		if (isMounted && refresh) {
			axios
				.get('http://localhost:3008/users/' + authUserID)
				.then(async (res) => {
					console.log(res);
					setAuthUserTeams(res.data.teams);
					setTeamID(res.data.teamID);
					await setObj();
					setRefresh(false);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, [setAuthUserTeams, refresh, setRefresh, setObj, setTeamID, isMounted]);

	const handleCreateTeamButton = () => {
		const accessToken = Cookies.get('accessToken');
		if (!accessToken) {
			alert('Login Required');
		}
		const requestObj = {
			accessToken: accessToken,
		};
		console.log(accessToken);
		axios.post('http://localhost:3009/login/verify', requestObj).then((res) => {
			console.log('res data is ' + res.data);
			if (res.data === 'accepted') {
				history.push('/create-team');
			}
		});
	};

	const handleSelectedTeam = async (id, teamName) => {
		const teamObj = {
			id: id,
			teamName: teamName,
		};
		setSelectedTeam({ teamObj });
		await setTimeout(() => {
			history.push('/team/detail/' + id);
		});
	};

	//fix unique key error in the table using the team context -> store team IDs
	//should add table headers, team admin, and number of team members into team main table
	return (
		<div>
			<br />
			<div>
				{authUser ? (
					<h1 className='display-4 text-center'>{authUser}'s Teams</h1>
				) : (
					<div>
						<h1 className='display-4 text-center'>Team Page</h1>
						<h6>Login Required</h6>
					</div>
				)}
			</div>
			<div>
				{loading ? (
					<div className='d-flex justify-content-center'>
						<br />
						<br />
						<div className='spinner-border text-warning' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>

						<br />
						<br />
					</div>
				) : (
					<div className='list-group container'>
						<table className='table table-hover table-striped table-bordered'>
							<thead className='thead-dark'>
								<tr>
									<th scope='col'>Team Name</th>
									<th scope='col'>Team ID</th>
								</tr>
							</thead>
							<tbody>
								{teamObj.tableObj &&
									teamObj.tableObj.map((e) => {
										return (
											<tr
												key={e.teamID}
												onClick={() =>
													handleSelectedTeam(e.teamID, e.authUserTeams)
												}
											>
												<td>{e.authUserTeams}</td>
												<td>{e.teamID}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<br />
			<div className='text-center'>
				<button onClick={handleCreateTeamButton} className='btn btn-secondary'>
					Create New Team
				</button>
				<h6>Refresh: {refresh ? 'true' : 'false'}</h6>
				<h6>authUser: {authUser}</h6>
				<h6>authUserID: {authUserID}</h6>
			</div>
		</div>
	);
};

export default Team_Main;
