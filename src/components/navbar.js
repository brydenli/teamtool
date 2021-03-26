import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import handleLogout from '../components/logout';
import axios from 'axios';
const Cookies = require('js-cookie');

const NavBar = () => {
	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		const requestObj = {
			accessToken: accessToken,
		};
		axios
			.post('http://localhost:3009/login/detectUser', requestObj)
			.then((res) => {});
	}, []);

	return (
		<div className='navbar navbar-dark bg-primary navbar-expand-lg'>
			<Link to='/' className='navbar-brand'>
				teamtool
			</Link>
			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav mr-auto'>
					<li className='navbar-item'>
						<Link to='/team' className='nav-link'>
							Team
						</Link>
					</li>
					<li className='navbar-item'>
						<Link to='/login' className='nav-link'>
							Login
						</Link>
					</li>
					<li className='navbar-item'>
						<Link to='/create-user' className='nav-link'>
							Create User
						</Link>
					</li>

					<li className='navbar-item'>
						<Link
							to=''
							className='nav-link'
							href='#'
							onClick={() => {
								window.confirm('Press OK to Logout') && handleLogout(); //need a better way to logout //add password strength checker
							}}
						>
							Logout
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
