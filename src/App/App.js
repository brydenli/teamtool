import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/home';

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path='/' exact component={Home} />
					{/* <Route path='/login' component={Login} />
					<Route path='/create-user' component={CreateUser} /> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
