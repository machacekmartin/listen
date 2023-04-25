import {
	CssBaseline,
	BottomNavigation,
	BottomNavigationAction
} from '@mui/material';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route,
	Link,
	useRoute,
	useRouter,
	useMatch,
	useRouterContext
} from '@tanstack/react-router';
import { useState } from 'react';
import {
	ElectricMeter,
	ElectricMeterOutlined,
	ElectricMeterRounded,
	EmojiEvents,
	EmojiEventsOutlined,
	MusicNote,
	MusicNoteOutlined,
	Person,
	PersonOutlined
} from '@mui/icons-material';

import LoginPage from './pages/Login';
import RatePage from './pages/Rate';
import LeaderboardPage from './pages/Leaderboard';
import ProfilePage from './pages/Profile';
import IntroPage from './pages/Intro';

const rootRoute = new RootRoute({
	component: () => {
		const [value, setValue] = useState(0);

		return (
			<>
				<CssBaseline />

				<Outlet />

				{window.location.pathname !== '/intro' && (
					<BottomNavigation
						value={value}
						showLabels={false}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
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
						{navigation.map((item, index) => (
							<BottomNavigationAction
								key={item.route.path}
								LinkComponent={Link}
								to={`/${item.route.path}`}
								icon={
									value === index ? <item.icon.active /> : <item.icon.regular />
								}
								color="white"
								sx={{
									'display': 'flex',
									'width': 60,
									'maxWidth': 60,
									'minWidth': 60,
									'height': 55,
									'borderRadius': 3,
									'color': 'white !important',
									'backgroundColor': value === index ? '#51507D' : 'none',
									':hover': {
										backgroundColor: '#51507D'
									}
								}}
							/>
						))}
					</BottomNavigation>
				)}
			</>
		);
	}
});

const introRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/intro',
	component: IntroPage
});

const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage
});

const rateRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/rate',
	component: RatePage
});

const leaderboardRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/leaderboard',
	component: LeaderboardPage
});

const profileRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/profile',
	component: ProfilePage
});

const navigation = [
	{
		route: introRoute,
		icon: { regular: ElectricMeterOutlined, active: ElectricMeter }
	},
	{
		route: rateRoute,
		icon: { regular: MusicNoteOutlined, active: MusicNote }
	},
	{
		route: leaderboardRoute,
		icon: { regular: EmojiEventsOutlined, active: EmojiEvents }
	},
	{
		route: profileRoute,
		icon: { regular: PersonOutlined, active: Person }
	}
];

// const notFoundRoute = new Route({
// 	getParentRoute: () => rootRoute,
// 	path: '*',
// 	component: NotFound
// });

const routeTree = rootRoute.addChildren([
	rateRoute,
	leaderboardRoute,
	profileRoute,
	introRoute,
	loginRoute
	// notFoundRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => <RouterProvider router={router} />;

export default App;
