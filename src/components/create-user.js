import React, { useState } from 'react';

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
	};

	return (
		<div>
			<h1>Create User</h1>
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
				<div>
					<label>Email</label>
					<input
						type='text'
						required
						value={email}
						onChange={handleEmail}
					></input>
				</div>
				<div>
					<label>First Name</label>
					<input
						type='text'
						required
						value={firstName}
						onChange={handleFirstName}
					></input>
				</div>
				<div>
					<label>Last Name</label>
					<input
						type='text'
						required
						value={lastName}
						onChange={handleLastName}
					></input>
				</div>
				<div>
					<button type='submit' onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateUser;
