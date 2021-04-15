import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthUserContext } from '../context/authUserContext';
import { TeamContext } from '../context/teamContext';
import axios from 'axios';
import './css/team_tasks.css';

const TeamTasks = () => {
	let history = useHistory();
	const { teamName } = useContext(TeamContext);
	const { authUser } = useContext(AuthUserContext);
	const [id, setId] = useState('');
	const [tasks_1, setTasks_1] = useState([]);
	const [tasks_2, setTasks_2] = useState([]);
	const [tasks_3, setTasks_3] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const pathlong = window.location.pathname;
		const path = pathlong.slice(12);
		setId(path);
	});

	useLayoutEffect(() => {
		if (!isLoaded && id) {
			console.log(id);
			axios.get('http://localhost:3008/teams/tasks/' + id).then((res) => {
				console.log(res);
				setTasks_1(res.data);
				console.log(tasks_1);
			});
			axios.get('http://localhost:3008/teams/tasks1/' + id).then((res) => {
				console.log(res);
				setTasks_2(res.data);
				console.log(tasks_2);
			});

			setIsLoaded(true);
		}
	});

	const handleHome = () => {
		history.push('/team/detail/' + window.location.pathname.slice(12));
	};

	const handleTextChannel = (e) => {
		e.stopPropagation();
		history.push('/team/channel/' + id);
	};

	const handleSettings = () => {
		history.push('/team/settings/' + id);
	};

	const handleNewTask = () => {
		history.push('/team/newtask/' + id);
	};

	return isLoaded ? (
		<div>
			<div className='text-center mt-5 page-content'>
				<h3 className='font-weight-light'>Tasks @{teamName}</h3>
			</div>
			<div>
				<div className='table-container'>
					<table className='table center-table-1'>
						<thead>
							<tr>
								<th>Task</th>
								<th>Progress</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{tasks_1 &&
								tasks_1.map((task) => {
									return (
										<tr>
											<td>{task}</td>
											<td>
												<a href='#'>Progress</a>
											</td>
											<td>
												<a
													href='#'
													onClick={() => {
														window.confirm(
															`Press OK to delete the following task: ${task}`
														);
													}}
												>
													Delete
												</a>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			<div className='task-button'>
				<button className='btn btn-secondary' onClick={handleNewTask}>
					Create New Task
				</button>
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
							<h6 className='py-4 px-3 mb-0'>Tasks</h6>
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
	) : (
		<div>
			<div className='text-center mt-5 page-content'>
				<h3 className='font-weight-light'>Tasks @{teamName}</h3>
			</div>
			<div>
				<div className='table-container'>
					<table className='table center-table-1'>
						<thead>
							<tr>
								<th>Task (Not Started)</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>
					</table>
				</div>
				<div>
					<table className='table center-table-2'>
						<tr>
							<th>Task (In Progress)</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</table>
				</div>
				<div>
					<table className='table center-table-3'>
						<tr>
							<th>Task (Completed)</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</table>
				</div>
			</div>
			<div className='task-button'>
				<button className='btn btn-secondary' onClick={handleNewTask}>
					Create New Task
				</button>
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
							<h6 className='py-4 px-3 mb-0'>Tasks</h6>
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

export default TeamTasks;
