import React, { useState } from 'react';

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
	};

	return (
		<div>
			<h1>Login to teamtool</h1>
			<form>
				<div>
					<label>Username</label>
					<input
						type='text'
						required
						value={username}
						onChange={handleUsername}
					></input>
				</div>
				<div>
					<label>Password</label>
					<input
						type='text'
						required
						value={password}
						onChange={handlePassword}
					></input>
				</div>
				<button type='submit' onClick={handleSubmit}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
