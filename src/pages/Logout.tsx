import { useEffect } from 'react';
import { Box } from '@mui/material';

import { signOut } from '../firebase';

const LogoutPage = () => {
	useEffect(() => {
		signOut();
	}, []);

	// just empty box to return someting
	return <Box />;
};

export default LogoutPage;
