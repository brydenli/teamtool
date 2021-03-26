const Cookies = require('js-cookie');

const handleLogout = () => {
	Cookies.remove('accessToken');
	Cookies.remove('refreshToken');
	return true;
};

export default handleLogout;
