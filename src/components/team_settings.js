import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthUserContext } from '../context/authUserContext';
import { TeamContext } from '../context/teamContext';
const Cookies = require('js-cookie');

const TeamSettings = () => {
	let history = useHistory();
	const { teamName, teamAdmin, setTeamAdmin } = useContext(TeamContext);
	const { authUser, setAuthUser, authUserID, setAuthUserID } = useContext(
		AuthUserContext
	);
	const [id, setId] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const pathlong = window.location.pathname;
		const path = pathlong.slice(13);
		console.log(path);
		setId(path);

		axios.get('http://localhost:3008/teams/' + id).then((res) => {
			setTeamAdmin(res.data.admin);
		});

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
		if (teamAdmin === authUser) {
			setIsAdmin(true);
		}
	});

	const handleHome = () => {
		history.push('/team/detail/' + window.location.pathname.slice(15));
	};

	const handleTextChannel = (e) => {
		e.stopPropagation();
		history.push('/team/channel/' + id);
	};

	const handleTasks = () => {
		history.push('/team/tasks/' + id);
	};

	const leaveTeam = () => {
		const requestObj = {
			user: authUser,
			userID: authUserID,
			teamName: teamName,
			teamID: id,
		};

		axios
			.put('http://localhost:3008/users/leave-team', requestObj)
			.then(axios.put('http://localhost:3008/teams/leave-team', requestObj))
			.then(() => window.location('/team'))
			.catch((err) => console.log(err));
	};

	return (
		<div>
			{isAdmin ? (
				<div>
					<div className='text-center mt-5 page-content'>
						<h3 className='font-weight-light'>Admin Settings</h3>
						<br />

						<div className='form-group'>
							<button className='btn btn-secondary'>
								Give Admin Role to another User
							</button>
						</div>
						<div className='form-group'>
							<button className='btn btn-danger'>Leave Team</button>
						</div>
						<div className='form-group'>
							<button className='btn btn-danger'>Delete Team</button>
						</div>
					</div>
					<div className='vertical-nav' id='sidebar'>
						<div class='py-4 px-3 mb-0 bg-light'>
							<div class='media d-flex align-items-center'>
								<div class='media-body'>
									<h5 class='m-0 font-weight-light'>{authUser}</h5>
								</div>
							</div>
						</div>
						<div className='navbar'>
							<ul class='nav d-flex flex-column align-items-start bg-white mb-0'>
								<li class='navbar-item'>
									<h6 className='py-4 px-3 mb-0' onClick={() => handleHome()}>
										Home
									</h6>
								</li>
								<li class='navbar-item'>
									<h6
										className='py-4 px-3 mb-0'
										onClick={(e) => handleTextChannel(e)}
									>
										Text Channel
									</h6>
								</li>
								<li class='navbar-item'>
									<h6 className='py-4 px-3 mb-0' onClick={() => handleTasks()}>
										Tasks
									</h6>
								</li>
								<li class='navbar-item'>
									<h6 className='py-4 px-3 mb-0'>Settings</h6>
								</li>
							</ul>
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className='text-center mt-5 page-content'>
						<h3 className='font-weight-light'>Settings</h3>
						<br />
						<button
							className='btn btn-secondary'
							onClick={() => {
								leaveTeam();
							}}
						>
							Leave Team
						</button>
						<h6>UserID: {authUserID}</h6>
					</div>
					<div className='vertical-nav' id='sidebar'>
						<div class='py-4 px-3 mb-0 bg-light'>
							<div class='media d-flex align-items-center'>
								<div class='media-body'>
									<h5 class='m-0 font-weight-light'>{authUser}</h5>
								</div>
							</div>
						</div>
						<div className='navbar'>
							<ul class='nav d-flex flex-column align-items-start bg-white mb-0'>
								<li class='navbar-item'>
									<h6 className='py-4 px-3 mb-0' onClick={() => handleHome()}>
										Home
									</h6>
								</li>
								<li class='navbar-item'>
									<h6
										className='py-4 px-3 mb-0'
										onClick={(e) => handleTextChannel(e)}
									>
										Text Channel
									</h6>
								</li>
								<li class='navbar-item'>
									<h6 className='py-4 px-3 mb-0' onClick={() => handleTasks()}>
										Tasks
									</h6>
								</li>
								<li class='navbar-item'>
									<h6 className='py-4 px-3 mb-0'>Settings</h6>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TeamSettings;
