import {
	Box,
	CircularProgress,
	Fade,
	Slide,
	Typography,
	Zoom
} from '@mui/material';
import { useEffect } from 'react';
import TinderCard from 'react-tinder-card';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useRandomSong from '../hooks/useRandomSong';

const RatePage = () => {
	const user = useLoggedInUser();
	const [song, newSong] = useRandomSong();

	useEffect(() => {
		console.log('rate render');
	});

	return (
		<Box sx={{ padding: 2 }} width="100%">
			{song === null && (
				<Box
					position="absolute"
					left="50%"
					top="50%"
					sx={{ transform: 'translate(-50%)' }}
				>
					<CircularProgress />
				</Box>
			)}

			{song !== null && (
				<Zoom in={song !== null} timeout={600}>
					<Box>
						<TinderCard
							onSwipe={() => null}
							onCardLeftScreen={() => newSong()}
							onSwipeRequirementFulfilled={e => console.log('fulfil!', e)}
						>
							<Box
								position="relative"
								height="70vh"
								borderRadius={7}
								overflow="hidden"
								border="solid 10px #fff"
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
									src={song?.album.cover_xl}
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
										{song?.title}
									</Typography>
									<Typography>{song?.artist.name}</Typography>
									{/* <Typography>{JSON.stringify(song.preview)}</Typography> */}
									{/* <Button onClick={() => newSong()}>New somg</Button> */}
								</Box>
							</Box>
						</TinderCard>
					</Box>
				</Zoom>
			)}
		</Box>
	);
};

export default RatePage;
