import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleLogout from '../components/logout';
import { AuthUserContext } from '../context/authUserContext';

const NavBar = () => {
	const { authUser } = useContext(AuthUserContext);
	const [isNotificationPage, setIsNotificationPage] = useState(false);
	let history = useHistory();

	if (!authUser) {
		return (
			<div className='navbar navbar-dark bg-dark navbar-expand-lg'>
				<Link to='/' className='navbar-brand'>
					teamtool
				</Link>
			</div>
		);
	} else if (isNotificationPage) {
		return (
			<div className='navbar navbar-dark bg-dark navbar-expand-lg'>
				<Link to='/' className='navbar-brand'>
					teamtool
				</Link>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav mr-auto'>
						<li className='navbar-item'>
							<Link to='/team' className='nav-link'>
								Teams
							</Link>
						</li>
					</ul>
					<ul className='navbar-nav ml-auto'>
						<li className='navbar-item '>
							<Link
								to='/notifications'
								className='nav-link'
								onClick={() => {
									setIsNotificationPage(false);
									history.goBack();
								}}
							>
								Notifications
							</Link>
						</li>
						<li className='navbar-item'>
							<Link
								to=''
								className='nav-link'
								href='#'
								onClick={() => {
									window.confirm('Press OK to Logout') && handleLogout();
								}}
							>
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	} else {
		return (
			<div className='navbar navbar-dark bg-dark navbar-expand-lg'>
				<Link to='/' className='navbar-brand'>
					teamtool
				</Link>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav mr-auto'>
						<li className='navbar-item'>
							<Link to='/team' className='nav-link'>
								Teams
							</Link>
						</li>
					</ul>
					<ul className='navbar-nav ml-auto'>
						<li className='navbar-item '>
							<Link
								to='/notifications'
								className='nav-link'
								onClick={() => {
									setIsNotificationPage(true);
								}}
							>
								Notifications
							</Link>
						</li>
						<li className='navbar-item'>
							<Link
								to=''
								className='nav-link'
								href='#'
								onClick={() => {
									window.confirm('Press OK to Logout') && handleLogout();
								}}
							>
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
};

export default NavBar;
