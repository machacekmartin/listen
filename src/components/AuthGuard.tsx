import { Box, LinearProgress } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = PropsWithChildren<{
	fail: JSX.Element;
	success: JSX.Element;
}>;

const AuthGuard: FC<Props> = ({ fail, success }) => {
	const user = useLoggedInUser();

	if (user === undefined)
		return (
			<Box sx={{ width: '100%' }}>
				<LinearProgress />
			</Box>
		);
	if (user === null) return fail;

	return success;
};

export default AuthGuard;
