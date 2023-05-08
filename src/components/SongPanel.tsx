import { Box, SxProps, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

import { Song } from '../firebase';
import useRatingsForSong from '../hooks/useRatingsForSong';

type Props = PropsWithChildren<{
	song: Song;
	sx?: SxProps;
}>;

const SongPanel: FC<Props> = ({ song, sx }) => {
	const ratings = useRatingsForSong(song);

	return (
		<Box
			width="100%"
			display="flex"
			alignItems="center"
			p={1.2}
			borderRadius={6}
			position="relative"
			sx={{
				backgroundColor: 'white',
				boxShadow: '0px 5px 25px rgba(0, 26, 255, 0.25)',
				...sx
			}}
		>
			<Box
				component="img"
				width="55px"
				height="55px"
				mr={2}
				borderRadius={4}
				sx={{
					objectFit: 'cover',
					pointerEvents: 'none'
				}}
				alt={song.artist.name}
				src={song.album.cover_xl}
			/>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				overflow="hidden"
			>
				<Typography
					fontWeight="bold"
					sx={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis'
					}}
				>
					{song.title}
					{song.title}
					{song.title}
				</Typography>
				<Typography fontSize={13} color="gray">
					{song.artist.name}
				</Typography>
			</Box>

			<Typography>AUDIO</Typography>

			<Typography position="absolute" top={-10} right={0}>
				{ratings?.filter(rating => rating === true).length} /{' '}
				{ratings?.filter(rating => rating === false).length}
			</Typography>
		</Box>
	);
};

export default SongPanel;
