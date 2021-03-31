const Cookies = require('js-cookie');

const handleLogout = () => {
	Cookies.remove('accessToken');
	Cookies.remove('refreshToken');
	window.location = '/';
	return true;
};

export default handleLogout;
