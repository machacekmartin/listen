import { Box } from '@mui/material';
import { PropsWithChildren, forwardRef } from 'react';

type Props = PropsWithChildren<{
	icon: JSX.Element;
	bg: string;
	iconTilt?: string;
	iconAlignment: 'left' | 'right';
	ref: HTMLDivElement;
}>;

const SwipeIndicator = forwardRef<HTMLDivElement, Props>(
	({ bg, iconTilt, icon, iconAlignment }, ref) => (
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
				background: bg,
				opacity: 0,
				pointerEvents: 'none'
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
