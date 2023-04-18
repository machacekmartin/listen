import { Box } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';

const HomePage = () => {
	const user = useLoggedInUser();

	return <Box> {user?.email} </Box>;
};

export default HomePage;
