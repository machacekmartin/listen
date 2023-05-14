import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import SongPanel from '../components/SongPanel';
import { SongUrlReference } from '../types';
import useMySongs from '../hooks/useMySongs';

const MySongsPage = () => {
	const [playingSong, setPlayingSong] = useState<SongUrlReference>();
	const audio = useRef<HTMLAudioElement>(null);
	const mySongs = useMySongs();

	useEffect(() => {
		if (playingSong) audio.current?.play();
	}, [playingSong]);

	return (
		<>
			<Typography variant="h5" sx={{ fontWeight: 'bold' }} mb={2}>
				My Songs
			</Typography>

			<Typography variant="h6" sx={{ fontWeight: 'bold' }} mb={2}>
				You have liked: {mySongs.length} songs
			</Typography>

			{playingSong && (
				<Box
					component="audio"
					display="none"
					ref={audio}
					src={playingSong.url}
				/>
			)}

			{mySongs.map((song, index) => (
				<SongPanel
					key={index}
					sx={{ mb: index === mySongs.length - 1 ? 15 : 2 }}
					songId={song.song_id}
					playing={playingSong?.id === song.song_id ?? true}
					onStop={() => setPlayingSong(undefined)}
					onPlay={songReference => setPlayingSong(songReference)}
				/>
			))}
		</>
	);
};

export default MySongsPage;
