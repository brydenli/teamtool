import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthUserContext } from '../context/authUserContext';
import { TeamContext } from '../context/teamContext';

const TextChannel = () => {
	let history = useHistory();
	const { teamName } = useContext(TeamContext);
	const { authUser } = useContext(AuthUserContext);
	const [id, setId] = useState('');

	useEffect(() => {
		const pathlong = window.location.pathname;
		const path = pathlong.slice(14);
		console.log(path);
		setId(path);
	}, []);

	const handleHome = () => {
		history.push('/team/detail/' + window.location.pathname.slice(14));
	};

	const handleTasks = () => {
		history.push('/team/tasks/' + id);
	};

	const handleSettings = () => {
		history.push('/team/settings/' + id);
	};

	return (
		<div>
			<div className='text-center mt-5 page-content'>
				<h3 className='font-weight-light'>@{teamName}</h3>
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
							<h6 className='py-4 px-3 mb-0'>Text Channel</h6>
						</li>
						<li class='navbar-item'>
							<h6 className='py-4 px-3 mb-0' onClick={() => handleTasks()}>
								Tasks
							</h6>
						</li>
						<li class='navbar-item'>
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

export default TextChannel;
