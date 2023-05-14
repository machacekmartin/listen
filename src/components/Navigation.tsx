import {
	EmojiEvents,
	EmojiEventsOutlined,
	LibraryMusic,
	LibraryMusicOutlined,
	Logout,
	LogoutOutlined,
	MusicNote,
	MusicNoteOutlined
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Route, useRouter } from '@tanstack/react-router';
import { signOut } from 'firebase/auth';
import { FC } from 'react';

type Props = {
	onSelect: (route: Route) => void;
};

const Navigation: FC<Props> = ({ onSelect }) => {
	const router = useRouter();

	const items = ['rate', 'leaderboard', 'mysongs', 'logout'].map(routePath => ({
		route: (router.routeTree.children as Array<Route>).find(
			({ path }) => path === routePath
		),
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		icon: {
			rate: {
				regular: MusicNoteOutlined,
				active: MusicNote
			},
			leaderboard: {
				regular: EmojiEventsOutlined,
				active: EmojiEvents
			},
			mysongs: {
				regular: LibraryMusicOutlined,
				active: LibraryMusic
			},
			logout: {
				regular: LogoutOutlined,
				active: Logout
			}
		}[routePath]!
	}));

	return (
		<BottomNavigation
			showLabels={false}
			onChange={(_, newValue) => onSelect(newValue)}
			sx={{
				borderRadius: 7,
				position: 'fixed',
				left: 16,
				bottom: 16,
				width: 'calc(100% - 32px)',
				backgroundColor: '#373669',
				justifyContent: 'space-around',
				alignItems: 'center',
				padding: 1.5,
				height: 'auto'
			}}
		>
			{items.map((item, index) => (
				<BottomNavigationAction
					key={index}
					value={item.route}
					icon={
						router.state.currentLocation.pathname === item.route?.fullPath ? (
							<item.icon.active />
						) : (
							<item.icon.regular />
						)
					}
					sx={{
						'display': 'flex',
						'width': 60,
						'maxWidth': 60,
						'minWidth': 60,
						'height': 55,
						'borderRadius': 3,
						'color': 'white !important',
						'backgroundColor':
							router.state.currentLocation.pathname === item.route?.fullPath
								? '#51507D'
								: 'none',
						':hover': {
							backgroundColor: '#51507D'
						}
					}}
				/>
			))}
		</BottomNavigation>
	);
};

export default Navigation;
