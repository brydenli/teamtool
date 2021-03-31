import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// require('dotenv').config();

const Login = () => {
	let history = useHistory();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleCreateUserButton = () => {
		history.push('/create-user');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = {
			username: username,
			password: password,
		};
		await axios.post('http://localhost:3009/login/', user).then((response) => {
			console.log(response);
			const accessToken = response.data.accessToken;
			const refreshToken = response.data.refreshToken;
			Cookies.set('accessToken', accessToken);
			Cookies.set('refreshToken', refreshToken);
		});
		window.location = '/';
	};

	return (
		<div className='container-sm h-100'>
			<div className='row h-100'>
				<div className='col-6 mx-auto'>
					<br />
					<h1 className='display-2 text-center'>teamtool</h1>
					<form>
						<div className='form-outline mb-4'>
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

						<div class='container'>
							<div className='form-group text-center col'>
								<button
									type='submit'
									className='btn btn-secondary'
									onClick={handleSubmit}
								>
									Login
								</button>
							</div>
							<div className='form-group text-center col'>
								<button
									type='button'
									className='btn btn-secondary'
									onClick={handleCreateUserButton}
								>
									Create User
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
