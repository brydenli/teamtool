import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/home';
import CreateUser from '../components/create-user';
import Login from '../components/login';
import NavBar from '../components/navbar';

function App() {
	return (
		<div>
			<Router>
				<NavBar></NavBar>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/create-user' component={CreateUser} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
