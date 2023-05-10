import { Box } from '@mui/material';

import TextButton from '../components/TextButton';
import { signOut } from '../firebase';

const ProfilePage = () => (
	<Box>
		<TextButton onClick={signOut}>Sign out</TextButton>
	</Box>
);

export default ProfilePage;
