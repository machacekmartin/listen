import { Box, Button, MobileStepper, Typography } from '@mui/material';
import { ArrowForward, MusicNote, Person } from '@mui/icons-material';
import { useState } from 'react';

import Circle from '../components/Circle';

const IntroPage = () => {
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	return (
		<Box
			sx={{
				paddingTop: 15,
				paddingX: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Circle sx={{ marginBottom: 10 }}>
				<MusicNote sx={{ width: '100%', height: '100%' }} />
			</Circle>

			<MobileStepper
				variant="dots"
				steps={3}
				position="static"
				activeStep={activeStep}
				nextButton={undefined}
				backButton={undefined}
			/>

			<Typography
				variant="h4"
				sx={{
					fontWeight: 'bold',
					textAlign: 'center',
					marginY: 5
				}}
			>
				Listen to randomly selected song
			</Typography>

			<Button
				variant="contained"
				sx={{
					position: 'fixed',
					bottom: 16,
					width: 'calc(100% - 32px)',
					boxShadow: 'none',
					backgroundColor: '#373669',
					fontWeight: 'bold',
					textTransform: 'none',
					borderRadius: 3,
					padding: 2,
					zIndex: 2
				}}
				fullWidth
				onClick={handleNext}
			>
				<Typography sx={{ fontWeight: 'bold' }}>Next</Typography>
			</Button>
		</Box>
	);
};

export default IntroPage;
