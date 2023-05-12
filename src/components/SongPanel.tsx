import {
	Box,
	CircularProgress,
	IconButton,
	SxProps,
	Typography
} from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { PlayArrow, Stop } from '@mui/icons-material';

import useSong from '../hooks/useSong';
import { SongUrlReference } from '../types';

type Props = PropsWithChildren<{
	songId: string;
	playing: boolean;
	ratings: {
		positive: number;
		negative: number;
	};
	onPlay: (reference: SongUrlReference) => void;
	onStop: () => void;
	sx?: SxProps;
}>;

const SongPanel: FC<Props> = ({
	sx,
	songId,
	onPlay,
	onStop,
	ratings,
	playing
}) => {
	const song = useSong(songId);

	return (
		<Box
			position="relative"
			width="100%"
			display="flex"
			alignItems="center"
			p={1.2}
			borderRadius={6}
			sx={{
				backgroundColor: 'white',
				boxShadow: '0px 5px 25px rgba(0, 26, 255, 0.25)',
				...sx
			}}
		>
			{song === null ? (
				<Box sx={{ paddingY: 1.5, pl: 2 }}>
					<CircularProgress size={25} />
				</Box>
			) : (
				<>
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
						mr="auto"
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
						</Typography>
						<Typography fontSize={13} color="gray">
							{song.artist.name}
						</Typography>
					</Box>

					{playing ? (
						<IconButton onClick={() => onStop()}>
							<Stop
								sx={{ fontSize: 35, color: 'hsla(0deg, 100%, 50%, .75)' }}
							/>
						</IconButton>
					) : (
						<IconButton
							onClick={() => onPlay({ id: song.id, url: song.preview })}
						>
							<PlayArrow sx={{ fontSize: 35, color: '#373669' }} />
						</IconButton>
					)}

					<Box
						position="absolute"
						top={-8}
						right={12}
						py={0.3}
						px={1.5}
						borderRadius="25%"
						sx={{
							backgroundColor: 'white',
							boxShadow: '0px 2px 15px rgba(0, 26, 255, 0.1)'
						}}
					>
						<Typography fontSize={12} fontWeight="900">
							{ratings.positive} / {ratings.negative}
						</Typography>
					</Box>
				</>
			)}
		</Box>
	);
};

export default SongPanel;
