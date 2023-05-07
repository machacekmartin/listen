import { Box } from '@mui/material';
import React, { FC, PropsWithChildren, forwardRef } from 'react';

type Props = PropsWithChildren<{
	icon: JSX.Element;
	bgColor: string;
	iconTilt?: string;
	iconAlignment: 'left' | 'right';
	ref: any;
}>;

const SwipeIndicator: FC<Props> = forwardRef(
	({ bgColor, iconTilt, icon, iconAlignment }, ref) => (
		<Box
			ref={ref}
			position="absolute"
			display="flex"
			height="100%"
			width="100%"
			left={0}
			top={0}
			color="white"
			sx={{
				transitionDuration: '.25s',
				backgroundColor: bgColor,
				opacity: 0
			}}
		>
			<Box
				position="absolute"
				right={iconAlignment === 'right' ? 20 : 'auto'}
				left={iconAlignment === 'left' ? 20 : 'auto'}
				top={20}
				sx={{ transform: `rotate(${iconTilt})` }}
			>
				{icon}
			</Box>
		</Box>
	)
);

export default SwipeIndicator;
