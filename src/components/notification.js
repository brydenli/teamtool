import React, { useContext, useLayoutEffect, useState } from 'react';
import { AuthUserContext } from '../context/authUserContext';
import axios from 'axios';

const Notifications = () => {
	const { authUserID, authUser, authUserTeams } = useContext(AuthUserContext);
	const [notifications, setNotifications] = useState([]);
	const [isMounted, setIsMounted] = useState(false);
	const [loading, setLoading] = useState(true);
	useLayoutEffect(() => {
		if (!isMounted) {
			axios.get('http://localhost:3008/users/' + authUserID).then((res) => {
				console.log(res.data.notifications);
				setNotifications(res.data.notifications);
			});
		}
		setIsMounted(true);
		setLoading(false);
	}, []);

	const handleAccept = (e, teamid, teamName) => {
		e.preventDefault();
		const requestObj = {
			user: authUser,
			teamID: teamid,
			teamName: teamName,
		};
		axios
			.put('http://localhost:3008/teams/adduser/' + teamid, requestObj)
			.then(async () => {
				axios.put(
					'http://localhost:3008/users/addteam/' + authUserID,
					requestObj
				);
				window.alert('Invite accepted');
				setNotifications(
					notifications.filter((notification) => {
						return notification.teamID !== teamid;
					})
				);
			})
			.catch((err) => {
				console.log(err);
				window.alert(err);
			});
	};

	return (
		<div className='text-center'>
			<br />
			<h1 className='font-weight-light'>Notifications</h1>
			<br />
			{notifications.length > authUserTeams.length ? (
				<div>
					<ul className='list-group'>
						{notifications &&
							notifications.map((notification) => {
								if (authUserTeams.indexOf(notification.teamName) < 0) {
									console.log(authUserTeams);
									console.log(notification.teamName);
									return (
										<li class='list-group-item' key={notification.teamID}>
											<h5 className='font-weight-light'>
												Invitation received: {notification.teamName}
											</h5>

											<button
												className='btn btn-success btn-sm'
												onClick={(e) => {
													handleAccept(
														e,
														notification.teamID,
														notification.teamName
													);
												}}
											>
												Join Team
											</button>
										</li>
									);
								}
							})}
					</ul>
				</div>
			) : (
				<div className='text-center'>
					<br />
					<br />
					<ul className='list-group'></ul>
					<li class='list-group-item'>
						<h5 className='font-weight-light'>No Notifications</h5>
					</li>

					<br />
					<br />
				</div>
			)}
		</div>
	);
};

export default Notifications;
