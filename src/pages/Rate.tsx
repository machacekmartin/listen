import { Box, CircularProgress, Zoom } from '@mui/material';

import useRandomSong from '../hooks/useRandomSong';
import RateCard from '../components/RateCard';
import { rateSong } from '../actions/rateSong';

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
						<RateCard
							onRate={rate}
							song={song}
							sx={{
								height: 'calc(100svh - 32px - 80px - 16px)'
							}}
						>
							<Box component="audio" controls autoPlay src={song.preview} />
						</RateCard>
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
