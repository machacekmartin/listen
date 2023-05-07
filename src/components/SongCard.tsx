import { Cancel, ThumbUp } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { FC, PropsWithChildren, useRef } from 'react';
import TinderCard from 'react-tinder-card';

import { Song } from '../hooks/useRandomSong';

import SwipeIndicator from './SwipeIndicator';

type Props = PropsWithChildren<{
	onLeaveScreen: () => void;
	song: NonNullable<Song>;
}>;

const SongCard: FC<Props> = ({ onLeaveScreen, song }) => {
	const thumb = useRef<HTMLDivElement>(null);
	const cancel = useRef<HTMLDivElement>(null);

	const indicateSwipe = (direction: string | null) => {
		if (cancel.current === null || thumb.current === null) {
			return;
		}

		if (direction === 'left') cancel.current.style.opacity = '1';
		if (direction === 'right') thumb.current.style.opacity = '1';
		if (direction === null) {
			thumb.current.style.opacity = '0';
			cancel.current.style.opacity = '0';
		}
	};

	return (
		<TinderCard
			swipeRequirementType="position"
			swipeThreshold={150}
			preventSwipe={['up', 'down']}
			onCardLeftScreen={onLeaveScreen}
			onSwipeRequirementFulfilled={indicateSwipe}
			onSwipeRequirementUnfulfilled={() => indicateSwipe(null)}
		>
			<Box
				position="relative"
				height="70vh"
				borderRadius={7}
				overflow="hidden"
				border="solid 8px #fff"
				boxShadow="0px 20px 50px rgba(0, 26, 255, 0.25)"
				sx={{
					'transitionDuration': '.25s',
					'willChange': 'transform',
					':active': {
						transform: 'scale(.9)',
						boxShadow: '0px 4px 10px rgba(0, 26, 255, 0.4)'
					}
				}}
			>
				<Box
					component="img"
					width="100%"
					height="100%"
					sx={{
						objectFit: 'cover',
						pointerEvents: 'none'
					}}
					alt="The house from the offer."
					src={song.album.cover_xl}
				/>
				<Box
					position="absolute"
					display="flex"
					flexDirection="column"
					justifyContent="flex-end"
					left={0}
					bottom={0}
					p={4}
					color="white"
					width="100%"
					height="100%"
					sx={{
						background:
							'linear-gradient(360deg, rgba(55, 54, 105) 0%, rgba(55, 54, 105, 0.641781) 42.69%, rgba(55, 54, 105, 0) 100%)'
					}}
				>
					{/* <Typography>{song.id}</Typography> */}
					<Typography fontWeight={800} fontSize={24} pb={1}>
						{song.title}
					</Typography>
					<Typography>{song.artist.name}</Typography>
					{/* <Typography>{JSON.stringify(song.preview)}</Typography> */}
					{/* <Button onClick={() => newSong()}>New somg</Button> */}
				</Box>
				<SwipeIndicator
					ref={thumb}
					icon={<ThumbUp sx={{ fontSize: 70 }} />}
					bgColor="rgba(255,0,0,0.5)"
					iconTilt="-25deg"
					iconAlignment="left"
				/>
				<SwipeIndicator
					ref={cancel}
					icon={<Cancel sx={{ fontSize: 70 }} />}
					bgColor="rgba(0,0,0,0.8)"
					iconTilt="25deg"
					iconAlignment="right"
				/>
			</Box>
		</TinderCard>
	);
};

export default SongCard;
