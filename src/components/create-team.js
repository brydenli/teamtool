import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Cookies = require('js-cookie');

const CreateTeam = () => {
	const [teamName, setTeamName] = useState('');
	const [admin, setAdmin] = useState('');
	const [userID, setUserID] = useState('');

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		const requestObj = {
			accessToken: accessToken,
		};
		axios
			.post('http://localhost:3008/teams/findadmin', requestObj)
			.then((res) => {
				console.log(res);
				setAdmin(res.data.username);
				setUserID(res.data.id);
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	}, []);

	const handleTeamName = (e) => {
		setTeamName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newTeam = {
			teamName: teamName,
			admin: admin,
			users: admin,
		};

		axios
			.post('http://localhost:3008/teams/add', newTeam)
			.then((res) => console.log(res))
			.then(
				axios.put('http://localhost:3008/users/' + userID, {
					adminOf: teamName,
					teams: teamName,
				})
			)
			.then((window.location = '/'))
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<br />
			<h1>Create Team</h1>
			<form>
				<div className='form-group'>
					<label>Team Name</label>
					<input
						type='text'
						required
						value={teamName}
						onChange={handleTeamName}
						className='form-control'
					></input>
				</div>
				<div className='form-group'>
					<button
						type='submit'
						className='btn btn-primary'
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateTeam;
