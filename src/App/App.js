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
import TextChannel from '../components/team_textchannel';
import TeamTasks from '../components/team_tasks';
import TeamSettings from '../components/team_settings';
import Notifications from '../components/notification';
import NewTask from '../components/create-new-task';

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
						<Route path='/team/detail/:id' exact component={Team} />
						<Route path='/team/channel/:id' component={TextChannel} />
						<Route path='/team/tasks/:id' component={TeamTasks} />
						<Route path='/team/settings/:id' component={TeamSettings} />
						<Route path='/notifications' component={Notifications} />
						<Route path='/team/newtask/:id' component={NewTask} />
					</Switch>
				</Router>
			</TeamContextProvider>
		</AuthUserProvider>
	);
}
//use ternary operator to change NavBar based on authorization
export default App;
