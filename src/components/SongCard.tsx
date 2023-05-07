import { Cancel, ThumbUp } from '@mui/icons-material';
import { Box, SxProps, Typography } from '@mui/material';
import { FC, PropsWithChildren, useRef } from 'react';
import TinderCard from 'react-tinder-card';

import { Song } from '../hooks/useRandomSong';

import SwipeIndicator from './SwipeIndicator';

type Props = PropsWithChildren<{
	onLeaveScreen: (decision: boolean) => void;
	song: NonNullable<Song>;
	sx?: SxProps;
}>;

const SongCard: FC<Props> = ({ onLeaveScreen, song, sx, children }) => {
	const thumb = useRef<HTMLDivElement>(null);
	const cancel = useRef<HTMLDivElement>(null);
	const draggable = useRef<HTMLDivElement>(null);

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

	const indicateDrag = () => {
		draggable.current.style.transform = 'scale(.95)';
		draggable.current.style.boxShadow = '0px 4px 10px rgba(0, 26, 255, 0.4)';
	};

	const cancelDrag = () => {
		draggable.current.style.transform = 'scale(1)';
		draggable.current.style.boxShadow = '0px 20px 50px rgba(0, 26, 255, 0.25)';
	};

	return (
		<TinderCard
			swipeRequirementType="position"
			swipeThreshold={150}
			preventSwipe={['up', 'down']}
			onSwipe={direction => onLeaveScreen(direction === 'right' ? true : false)}
			onSwipeRequirementFulfilled={indicateSwipe}
			onSwipeRequirementUnfulfilled={() => indicateSwipe(null)}
		>
			<Box
				onPointerDown={indicateDrag}
				onPointerUp={cancelDrag}
				position="relative"
				ref={draggable}
				borderRadius={7}
				overflow="hidden"
				border="solid 8px #fff"
				boxShadow="0px 20px 50px rgba(0, 26, 255, 0.25)"
				sx={{
					transitionDuration: '.25s',
					willChange: 'transform',
					...sx
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
					<Typography sx={{ opacity: '.5' }}>{song.id}</Typography>
					<Typography fontWeight={800} fontSize={24} pb={1}>
						{song.title}
					</Typography>
					<Typography>{song.artist.name}</Typography>
				</Box>

				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						background:
							'linear-gradient(180deg, hsla(4deg, 61%, 46%, .8) 0%,hsla(338deg, 47%, 37%, .0) 100%)',
						p: 2,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					{children}
				</Box>

				<SwipeIndicator
					ref={thumb}
					icon={<ThumbUp sx={{ fontSize: 70 }} />}
					bg="linear-gradient(45deg,hsla(241deg, 32%, 31%, .75) 0%,hsla(338deg, 47%, 37%, .75) 33%,hsla(4deg, 61%, 46%, .75) 67%,hsla(0deg, 100%, 50%, .75) 100%)"
					iconTilt="-25deg"
					iconAlignment="left"
				/>
				<SwipeIndicator
					ref={cancel}
					icon={<Cancel sx={{ fontSize: 70 }} />}
					bg="rgba(0,0,0,0.8)"
					iconTilt="25deg"
					iconAlignment="right"
				/>
			</Box>
		</TinderCard>
	);
};

export default SongCard;
