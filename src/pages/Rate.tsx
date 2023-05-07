import { Box, CircularProgress, Zoom } from '@mui/material';

import useRandomSong from '../hooks/useRandomSong';
import SongCard from '../components/SongCard';

const RatePage = () => {
	const [song, newSong] = useRandomSong();

	return (
		<Box sx={{ padding: 2 }} width="100%">
			{song === null && (
				<Box
					position="absolute"
					left="50%"
					top="50%"
					sx={{ transform: 'translate(-50%)' }}
				>
					<CircularProgress />
				</Box>
			)}

			{song !== null && (
				<Zoom in={song !== null} timeout={600}>
					<Box>
						<SongCard onLeaveScreen={() => newSong()} song={song} />
					</Box>
				</Zoom>
			)}
		</Box>
	);
};

export default RatePage;
