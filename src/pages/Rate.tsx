import { Box, CircularProgress, Zoom } from '@mui/material';
import { useRef } from 'react';

import useRandomSong from '../hooks/useRandomSong';
import SongCard from '../components/SongCard';
import { insertSongRating } from '../firebase';

const RatePage = () => {
	const [song, newSong] = useRandomSong();
	const audio = useRef<HTMLAudioElement>();

	const rate = (decision: boolean) => {
		if (song === null) return;

		insertSongRating(song.id, decision);

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
							<audio controls autoPlay src={song.preview} ref={audio} />
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
