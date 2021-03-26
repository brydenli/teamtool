import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { TeamContext } from '../context/teamContext';
const Cookies = require('js-cookie');

function Team_Main(props) {
	let history = useHistory();
	const [user, setUser] = useState('');
	const [userID, setUserID] = useState('');
	const [team, setTeam] = useState([]);

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		const requestObj = {
			accessToken: accessToken,
		};
		axios
			.post('http://localhost:3009/login/detectUser', requestObj)
			.then((res) => {
				setUser(res.data.username);
				setUserID(res.data.id);
				console.log('userID is ' + userID);
			});
		axios.get('http://localhost:3008/users/teamlist/' + userID).then((res) => {
			setTeam(res.data);
			console.log('team data: ' + team);
		});
	}, []);

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

	return (
		<div>
			<h1>{user}'s Teams</h1>

			<div className='list-group'>
				<table className='table table-hover table-striped'>
					<tbody>
						{team &&
							team.map((team_) => {
								return (
									<tr key={team_.id}>
										<td>{team_}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>

			<button onClick={handleCreateTeamButton} className='btn btn-primary'>
				Create New Team
			</button>
		</div>
	);
}

export default Team_Main;
