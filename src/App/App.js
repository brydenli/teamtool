import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../components/home';
import CreateUser from '../components/create-user';
import NavBar from '../components/navbar';
import CreateTeam from '../components/create-team';
import Team_Main from '../components/team_main';
import { AuthUserProvider } from '../context/authUserContext';
import { TeamContextProvider } from '../context/teamContext';
import Team from '../components/team';

function App() {
	return (
		<AuthUserProvider>
			<TeamContextProvider>
				<Router>
					<NavBar></NavBar>
					<Switch>
						<Route path='/' exact component={Home} />
						{/* <Route path='/login' component={Login} /> */}
						<Route path='/create-user' component={CreateUser} />
						<Route path='/create-team' component={CreateTeam} />
						<Route path='/team' exact component={Team_Main} />
						<Route path='/team/detail/:id' component={Team} />
					</Switch>
				</Router>
			</TeamContextProvider>
		</AuthUserProvider>
	);
}
//use ternary operator to change NavBar based on authorization
export default App;
