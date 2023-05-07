import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useRandomSong from '../hooks/useRandomSong';

const RatePage = () => {
	const user = useLoggedInUser();
	const [song, newSong] = useRandomSong();

	useEffect(() => {
		console.log('rate render');
	});

	return (
		<Box sx={{ padding: 2 }}>
			{song === null && <CircularProgress />}

			{song !== null && (
				<Box
					position="relative"
					height="75vh"
					borderRadius={7}
					overflow="hidden"
					borderColor="#373669"
					border={1}
				>
					{/*  */}

					<Box
						component="img"
						width="100%"
						height="100%"
						sx={{
							objectFit: 'cover'
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
								'linear-gradient(360deg, rgba(55, 54, 105) 0%, rgba(55, 54, 105, 0.641781) 32.44%, rgba(55, 54, 105, 0) 100%)'
						}}
					>
						{/* <Typography>{song.id}</Typography> */}
						<Typography fontWeight={800} fontSize={24} pb={2}>
							{song.title}
						</Typography>
						<Typography>{song.artist.name}</Typography>
						{/* <Typography>{JSON.stringify(song.preview)}</Typography> */}
						{/* <Button onClick={() => newSong()}>New somg</Button> */}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default RatePage;
