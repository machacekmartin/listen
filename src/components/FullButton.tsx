import { Button, SxProps } from '@mui/material';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	sx?: SxProps;
	onClick: () => void;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}>;

const FullButton: FC<Props> = ({ children, sx, type, onClick }) => (
	<Button
		type={type}
		sx={{
			'position': 'relative',
			'boxShadow': 'none',
			'backgroundColor': '#373669',
			'color': '#fff',
			'fontWeight': 'bold',
			'textTransform': 'none',
			'borderRadius': 3,
			'py': 2,
			':hover': {
				backgroundColor: '#222'
			},
			...sx
		}}
		fullWidth
		onClick={onClick}
	>
		{children}
	</Button>
);

export default FullButton;
