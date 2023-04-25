import { Box, SxProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	sx?: SxProps;
}>;

const Circle: FC<Props> = ({ children, sx }) => (
	<Box
		sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			margin: 'auto',
			width: 300,
			borderRadius: '50%',
			aspectRatio: '1/1',
			backgroundColor: 'white',
			boxShadow: '0 20px 50px rgba(0, 26, 255, 0.25)',
			...sx
		}}
	>
		<Box
			sx={{
				width: 100,
				height: 100,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: '#373669'
			}}
		>
			{children}
		</Box>
	</Box>
);

export default Circle;
