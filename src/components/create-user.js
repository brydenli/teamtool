import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleFirstName = (e) => {
		setFirstName(e.target.value);
	};
	const handleLastName = (e) => {
		setLastName(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (password.length >= 10) {
			const newUser = {
				username: username,
				email: email,
				password: password,
				firstName: firstName,
				lastName: lastName,
			};
			axios
				.post('http://localhost:3008/users/add', newUser)
				.then((res) => console.log(res.data))

				.then(() => {
					window.location = '/';
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert('Your password must be at least 10 characters');
		}
	};

	return (
		<div>
			<br />
			<h1>Create User</h1>
			<form>
				<div className='form-group'>
					<label>Username</label>
					<input
						type='text'
						required
						value={username}
						onChange={handleUsername}
						className='form-control'
					></input>
				</div>
				<div className='form-group'>
					<label>Password</label>
					<input
						type='password'
						required
						value={password}
						onChange={handlePassword}
						className='form-control'
					></input>
				</div>
				<div className='form-group'>
					<label>Email</label>
					<input
						type='text'
						required
						value={email}
						onChange={handleEmail}
						className='form-control'
					></input>
				</div>
				<div className='form-group'>
					<label>First Name</label>
					<input
						type='text'
						required
						value={firstName}
						onChange={handleFirstName}
						className='form-control'
					></input>
				</div>
				<div className='form-group'>
					<label>Last Name</label>
					<input
						type='text'
						required
						value={lastName}
						onChange={handleLastName}
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

export default CreateUser;
