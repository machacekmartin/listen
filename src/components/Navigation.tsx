import {
	ElectricMeter,
	ElectricMeterOutlined,
	EmojiEvents,
	EmojiEventsOutlined,
	MusicNote,
	MusicNoteOutlined,
	Person2,
	PersonOutlined
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import { FC } from 'react';

const navigation = [
	{
		path: '/intro',
		icon: { regular: ElectricMeterOutlined, active: ElectricMeter }
	},
	{
		path: '/rate',
		icon: { regular: MusicNoteOutlined, active: MusicNote }
	},
	{
		path: '/leaderboard',
		icon: { regular: EmojiEventsOutlined, active: EmojiEvents }
	},
	{
		path: '/profile',
		icon: { regular: PersonOutlined, active: Person2 }
	}
];

type Props = {
	onSelect: (path: string) => void;
};

const Navigation: FC<Props> = ({ onSelect }) => {
	const router = useRouter();

	return (
		<BottomNavigation
			showLabels={false}
			onChange={(_, newValue) => onSelect(newValue)}
			sx={{
				borderRadius: 5,
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
			{navigation.map(item => (
				<BottomNavigationAction
					key={item.path}
					value={item.path}
					icon={
						router.state.currentLocation.pathname === item.path ? (
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
							router.state.currentLocation.pathname === item.path
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
