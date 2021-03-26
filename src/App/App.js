import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../components/home';
import CreateUser from '../components/create-user';
import Login from '../components/login';
import NavBar from '../components/navbar';
import CreateTeam from '../components/create-team';
import Team_Main from '../components/team_main';

function App() {
	return (
		<div className='container'>
			<Router>
				<NavBar></NavBar>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/create-user' component={CreateUser} />
					<Route path='/create-team' component={CreateTeam} />
					<Route path='/team' component={Team_Main} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
