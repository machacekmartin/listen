import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import SongPanel from '../components/SongPanel';
import { Song } from '../firebase';
import useSongsWithRatings from '../hooks/useSongsWithRatings';

const LeaderboardPage = () => {
	const [currentlyPlaing, setCurrentlyPlaying] = useState<Song | null>(null);
	const audio = useRef<HTMLAudioElement>(null);
	const songs = useSongsWithRatings();

	useEffect(() => {
		if (currentlyPlaing) audio.current?.play();
	}, [currentlyPlaing]);

	const sortedSongs = [...songs].sort(
		(songA, songB) => songB.ratings.true - songA.ratings.true
	);

	return (
		<>
			<Typography variant="h5" sx={{ fontWeight: 'bold' }} mb={2}>
				Leaderboard
			</Typography>

			{currentlyPlaing && (
				<Box
					component="audio"
					display="none"
					ref={audio}
					src={currentlyPlaing.preview}
				/>
			)}

			{sortedSongs.map((song, index) => (
				<SongPanel
					song={song}
					key={index}
					sx={{ mb: index === songs.length - 1 ? 15 : 2 }}
					rating={` ${song.ratings.true} | ${song.ratings.false}`}
					isPlaying={song === currentlyPlaing}
					onStop={() => setCurrentlyPlaying(null)}
					onPlay={song => setCurrentlyPlaying(song)}
				/>
			))}
		</>
	);
};

export default LeaderboardPage;
