import { Box, Typography } from '@mui/material';

import useSongs from '../hooks/useSongs';
import SongPanel from '../components/SongPanel';

const LeaderboardPage = () => {
	const songs = useSongs();

	return (
		<>
			<Typography variant="h5" sx={{ fontWeight: 'bold' }} mb={2}>
				Leaderboard
			</Typography>
			{songs?.map((song, index) => (
				<SongPanel song={song} key={index} sx={{ mb: 2 }} />
			))}
		</>
	);
};

export default LeaderboardPage;
