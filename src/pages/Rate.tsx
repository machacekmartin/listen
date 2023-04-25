import { Box } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';

const RatePage = () => {
	const user = useLoggedInUser();

	return <Box sx={{ padding: 2 }}>{user?.email}</Box>;
};

export default RatePage;
