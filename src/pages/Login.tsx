import { Typography, TextField, Box, Icon } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { MusicNoteOutlined } from '@mui/icons-material';

import useField from '../hooks/useField';
import Circle from '../components/Circle';
import FullButton from '../components/FullButton';
import TextButton from '../components/TextButton';
import { signIn, signUp } from '../firebase';

const LoginPage = () => {
	const navigate = useNavigate();

	const [isSignUp, setSignUp] = useState(false);

	const email = useField('email', true);
	const password = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Box
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					isSignUp
						? await signUp(email.value, password.value)
						: await signIn(email.value, password.value);
					navigate({ to: '/rate' });
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Unknown error occurred'
					);
				}
			}}
			sx={{
				height: '100%',
				overflowY: 'auto',
				maxHeight: '100svh',
				p: 2
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%'
				}}
			>
				<Circle sx={{ padding: 8 }}>
					<Icon component={MusicNoteOutlined} sx={{ fontSize: 110 }} />
				</Circle>
				<Typography
					variant="h4"
					sx={{
						marginTop: 8,
						marginBottom: 5,
						fontWeight: 'bold',
						textAlign: 'center'
					}}
				>
					Do you have an account?
				</Typography>
				<TextField
					label="Email"
					{...email.props}
					type="email"
					sx={{ marginBottom: 2 }}
				/>
				<TextField label="Password" {...password.props} type="password" />
				{submitError && (
					<Typography
						variant="caption"
						textAlign="center"
						sx={{ color: 'error.main', mt: 1 }}
					>
						{submitError}
					</Typography>
				)}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 'auto',
						width: '100%',
						paddingY: 2
					}}
				>
					<FullButton type="submit" onClick={() => setSignUp(false)}>
						Log in
					</FullButton>
					<Typography
						variant="body1"
						sx={{ px: 6 }}
						fontWeight={800}
						color="#AAA"
					>
						or
					</Typography>
					<TextButton
						type="submit"
						onClick={() => setSignUp(true)}
						sx={{ mr: 4, textDecoration: 'underline' }}
					>
						Sign up
					</TextButton>
				</Box>
			</Box>
		</Box>
	);
};

export default LoginPage;
