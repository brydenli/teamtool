import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Cookies = require('js-cookie');

const Home = () => {
	const [name, setName] = useState('');

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		const requestObj = {
			accessToken: accessToken,
		};
		axios
			.post('http://localhost:3009/login/detectUser', requestObj)
			.then((res) => {
				setName(res.data.username);
			});
	}, []);

	return (
		<div>
			<br />
			<h1>Home</h1>
			<h6>Welcome {name}</h6>
		</div>
	);
};

export default Home;
