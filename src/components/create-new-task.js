import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewTask = () => {
	const [taskName, setTaskName] = useState('');
	const [id, setId] = useState('');

	useEffect(() => {
		const pathlong = window.location.pathname;
		const path = pathlong.slice(14);
		console.log(path);
		setId(path);
	});

	const handleTaskName = (e) => {
		setTaskName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const requestObj = {
			taskName: taskName,
			teamID: id,
		};

		axios
			.post('http://localhost:3008/teams/tasks', requestObj)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				window.alert(err);
				console.log(err);
			});

		window.location = '/team/tasks/' + id;
	};

	return (
		<div>
			<form>
				<div className='col-6 mx-auto text-center mt-5'>
					<input
						type='text'
						required
						className='form-control'
						placeholder='New Task Name'
						onChange={(e) => {
							handleTaskName(e);
						}}
					></input>
					<button
						type='submit'
						className='btn btn-secondary mt-3'
						onClick={(e) => {
							handleSubmit(e);
						}}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewTask;
