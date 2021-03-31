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
		<div className='container-sm'>
			<br />
			<h1 className='display-4 text-center'>Create User</h1>
			<form>
				<div class='row'>
					<div className='col'>
						<div className='form-group'>
							<input
								type='text'
								required
								value={firstName}
								onChange={handleFirstName}
								placeholder='First Name'
								className='form-control'
							></input>
						</div>
					</div>
					<div className='col'>
						<div className='form-group'>
							<input
								type='text'
								required
								value={lastName}
								onChange={handleLastName}
								placeholder='Last Name'
								className='form-control'
							></input>
						</div>
					</div>
				</div>
				<div className='form-group'>
					<input
						type='text'
						required
						value={username}
						onChange={handleUsername}
						placeholder='Username'
						className='form-control'
					></input>
				</div>
				<div className='form-group'>
					<input
						type='password'
						required
						value={password}
						onChange={handlePassword}
						placeholder='Password'
						className='form-control'
					></input>
				</div>
				<div className='form-group'>
					<input
						type='text'
						required
						value={email}
						onChange={handleEmail}
						placeholder='Email'
						className='form-control'
					></input>
				</div>

				<div className='form-group text-center'>
					<button type='submit' className='btn btn-dark' onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateUser;
