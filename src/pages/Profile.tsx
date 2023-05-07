import { Box } from '@mui/material';

import { signOut } from '../firebase';
import TextButton from '../components/TextButton';

const ProfilePage = () => (
	<Box>
		<TextButton onClick={signOut}>Sign out</TextButton>
	</Box>
);

export default ProfilePage;
