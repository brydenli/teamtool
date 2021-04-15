import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TeamContext } from '../context/teamContext';
import { AuthUserContext } from '../context/authUserContext';
import '../css/team.css';
import axios from 'axios';
const Cookies = require('js-cookie');
//add invite team members button

const Team = () => {
	let history = useHistory();
	const {
		selectedTeam,
		teamName,
		setTeamName,
		teamAdmin,
		setTeamAdmin,
		teamMembers,
		setTeamMembers,
	} = useContext(TeamContext);
	const { authUser, setAuthUser, setAuthUserID } = useContext(AuthUserContext);
	const [id, setId] = useState('');
	const [isMounted, setIsMounted] = useState(false);
	const [btnPress, setBtnPress] = useState(false);
	const [invitedUser, setInvitedUser] = useState('');

	useEffect(async () => {
		if (!isMounted) {
			let pathlong = window.location.pathname;
			let path = pathlong.slice(13);
			setId(path);
			await axios.get('http://localhost:3008/teams/' + path).then((res) => {
				setTeamMembers(res.data.users);
				setTeamAdmin(res.data.admin);
				setTeamName(res.data.teamName);
				setIsMounted(true);
			});
		}
		if (!authUser) {
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
	}, []);

	const handleTextChannel = () => {
		history.push('/team/channel/' + id);
	};

	const handleTasks = () => {
		history.push('/team/tasks/' + id);
	};

	const handleSettings = () => {
		history.push('/team/settings/' + id);
	};

	const handleInviteUserButton = () => {
		setBtnPress(!btnPress);
	};

	const handleInvitedUser = (e) => {
		setInvitedUser(e.target.value);
	};

	const handleSendInvite = (e) => {
		e.preventDefault();
		const requestObj = {
			teamID: id,
			teamName: teamName,
		};
		axios
			.put('http://localhost:3008/users/invitation/' + invitedUser, requestObj)
			.then((res) => {
				console.log(res);
				window.alert('Invite Sent');
				handleInviteUserButton();
			})
			.catch((err) => {
				console.log(err);
				window.alert(err);
			});
	};

	return (
		<div>
			<br />

			<div className='page-content'>
				<h3 className='display-4 text-center'>{teamName}</h3>
				<div className='text-center'>
					<br />
					{/* <h5>Team Name: {teamName}</h5>
					<h5>Team Admin: {teamAdmin}</h5>
					<h5>Team Members: {teamMembers}</h5>
					<h5># Team Members: {teamMembers.length}</h5>
					<h5>Team ID: {id}</h5>
					<h5>current user: {authUser}</h5> */}
					<br />
					<div>
						<table className='table'>
							<thead>
								<tr>
									<th className='lead'>
										<strong>Team Members</strong>
									</th>
								</tr>
							</thead>
							<tbody>
								{teamMembers.map((member) => {
									return (
										<tr>
											<td>{member}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					{btnPress ? (
						<div>
							<form>
								<div className='form-group'>
									<input
										value={invitedUser}
										onChange={handleInvitedUser}
										type='text'
										placeholder='User ID'
										required
									></input>
								</div>

								<div className='form-group'>
									<button
										type='submit'
										className='btn btn-dark'
										onClick={(e) => handleSendInvite(e)}
									>
										Invite User
									</button>
								</div>

								<div className='form-group'>
									<button
										className='btn btn-dark'
										onClick={() => handleInviteUserButton()}
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					) : (
						<div>
							<button
								className='btn btn-secondary'
								onClick={() => handleInviteUserButton()}
							>
								Invite User
							</button>
						</div>
					)}
				</div>
			</div>
			<div className='vertical-nav' id='sidebar'>
				<div className='py-4 px-3 mb-0 bg-light'>
					<div className='media d-flex align-items-center'>
						<div className='media-body'>
							<h5 className='m-0 font-weight-light'>{authUser}</h5>
						</div>
					</div>
				</div>
				<div className='navbar'>
					<ul className='nav d-flex flex-column align-items-start bg-white mb-0'>
						<li className='navbar-item'>
							<h6 className='py-4 px-3 mb-0'>Home</h6>
						</li>
						<li className='navbar-item'>
							<h6
								className='py-4 px-3 mb-0'
								onClick={() => handleTextChannel()}
							>
								Text Channel
							</h6>
						</li>
						<li className='navbar-item'>
							<h6 className='py-4 px-3 mb-0' onClick={() => handleTasks()}>
								Tasks
							</h6>
						</li>
						<li className='navbar-item'>
							<h6 className='py-4 px-3 mb-0' onClick={() => handleSettings()}>
								Settings
							</h6>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Team;
