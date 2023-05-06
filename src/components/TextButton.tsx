import { Button, SxProps } from '@mui/material';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	sx?: SxProps;
	onClick: () => void;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}>;

const TextButton: FC<Props> = ({ children, sx, onClick, type }) => (
	<Button
		type={type}
		variant="text"
		sx={{
			'position': 'relative',
			'fontWeight': 'bold',
			'textTransform': 'none',
			'p': 1,
			'whiteSpace': 'nowrap',
			':hover': {
				backgroundColor: 'transparent'
			},
			'fontSize': 16,
			...sx
		}}
		onClick={onClick}
	>
		{children}
	</Button>
);

export default TextButton;
