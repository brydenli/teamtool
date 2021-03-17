import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<div>
			<h1>Navbar</h1>
			<ul>
				<li>
					<Link to='/create-user'>Create User</Link>
				</li>
				<li>
					<Link to='/login'>Login</Link>
				</li>
				<li>
					<h1>Link</h1>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
