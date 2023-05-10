import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import useSongsRatings from '../hooks/useSongsRatings';
import SongPanel from '../components/SongPanel';
import useGroupBy from '../hooks/useGroupBy';
import { Rating, SongUrlReference } from '../types';

const LeaderboardPage = () => {
	const [playingSong, setPlayingSong] = useState<SongUrlReference>();
	const audio = useRef<HTMLAudioElement>(null);
	const songsRatings = useSongsRatings();
	const groupedRatings = useGroupBy<Rating>(songsRatings, 'song_id');
	const sortedGroups = [...Object.entries(groupedRatings)].sort(
		(a, b) =>
			b[1].filter(item => item.rating === true).length -
			a[1].filter(item => item.rating === true).length
	);

	useEffect(() => {
		if (playingSong) audio.current?.play();
	}, [playingSong]);

	return (
		<>
			<Typography variant="h5" sx={{ fontWeight: 'bold' }} mb={2}>
				Leaderboard
			</Typography>

			{playingSong && (
				<Box
					component="audio"
					display="none"
					ref={audio}
					src={playingSong.url}
				/>
			)}

			{sortedGroups.map((group, index) => (
				<SongPanel
					key={index}
					sx={{ mb: index === sortedGroups.length - 1 ? 15 : 2 }}
					songId={group[0]}
					ratings={{
						positive: group[1].filter(item => item.rating === true).length,
						negative: group[1].filter(item => item.rating === false).length
					}}
					playing={playingSong?.id === group[0] ?? true}
					onStop={() => setPlayingSong(undefined)}
					onPlay={songReference => setPlayingSong(songReference)}
				/>
			))}
		</>
	);
};

export default LeaderboardPage;
