import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthUserContext } from '../context/authUserContext';
import { TeamContext } from '../context/teamContext';
const Cookies = require('js-cookie');

const CreateTeam = () => {
	const {
		authUser,
		setAuthUser,
		authUserID,
		setAuthUserID,
		refresh,
		setRefresh,
	} = useContext(AuthUserContext);
	const { newTeamName, setNewTeamName } = useContext(TeamContext);

	useEffect(() => {
		if (!authUser || refresh) {
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
					setRefresh(false);
				})
				.catch((err) => {
					console.log(`Error: ${err}`);
				});
		}
	});

	const handleTeamName = (e) => {
		setNewTeamName(e.target.value);
	};

	const handlePUT = (newID) => {
		if (newID) {
			try {
				axios
					.put('http://localhost:3008/users/' + authUserID, {
						adminOf: newTeamName,
						teams: newTeamName,
						teamID: newID,
					})
					.then((res) => console.log(res))
					.catch((err) => console.log(err));
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log('No newID');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setRefresh(true);
		try {
			const newTeam = {
				teamName: newTeamName,
				users: authUser,
				admin: authUser,
			};
			console.log(newTeam);

			axios
				.post('http://localhost:3008/teams/add', newTeam)
				.then(async (res) => {
					console.log(res.data);
					const newID = await res.data._id;
					if (newID) {
						handlePUT(newID);
					}
				})

				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
		await setTimeout(() => {
			window.location = '/';
		}, 500);
	};

	return (
		<div className='container'>
			<br />
			<h1 className='display-4 text-center'>Create Team</h1>
			<form>
				<div className='form-group'>
					<input
						type='text'
						required
						value={newTeamName}
						onChange={handleTeamName}
						placeholder='Team Name'
						className='form-control'
					></input>
				</div>
				<div className='form-group text-center'>
					<button
						type='submit'
						className='btn btn-secondary'
						onClick={handleSubmit}
					>
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateTeam;
