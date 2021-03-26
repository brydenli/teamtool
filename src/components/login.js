import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

require('dotenv').config();

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		const user = {
			username: username,
			password: password,
		};
		axios.post('http://localhost:3009/login/', user).then((response) => {
			console.log(response);
			const accessToken = response.data.accessToken;
			const refreshToken = response.data.refreshToken;
			Cookies.set('accessToken', accessToken);
			Cookies.set('refreshToken', refreshToken);
		});
		window.location = '/';
	};

	return (
		<div>
			<br />
			<h1>Login</h1>
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
					<button
						type='submit'
						className='btn btn-primary'
						onClick={handleSubmit}
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
