import { Box, CircularProgress, Zoom } from '@mui/material';

import useRandomSong from '../hooks/useRandomSong';
import SongCard from '../components/SongCard';
import { rateSong } from '../firebase';

const RatePage = () => {
	const [song, newSong] = useRandomSong();

	const rate = (decision: boolean) => {
		if (song === null) return;
		rateSong(song, decision);
		newSong();
	};

	return (
		<Box>
			{(song !== null && (
				<Zoom in={song !== null} timeout={400}>
					<Box>
						<SongCard
							onLeaveScreen={rate}
							song={song}
							sx={{
								height: 'calc(100svh - 32px - 80px - 16px)'
							}}
						>
							{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
							<audio controls autoPlay src={song.preview} />
						</SongCard>
					</Box>
				</Zoom>
			)) || (
				<CircularProgress
					sx={{
						position: 'fixed',
						top: '50%',
						left: 'calc(50% - 20px)',
						transform: 'translate(-50%, -50%)'
					}}
				/>
			)}
		</Box>
	);
};

export default RatePage;
