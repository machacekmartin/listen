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
	Link
} from '@tanstack/react-router';
import { useState } from 'react';
import {
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

const rootRoute = new RootRoute({
	component: () => {
		const [value, setValue] = useState(0);

		return (
			<>
				<CssBaseline />

				<Outlet />

				<BottomNavigation
					value={value}
					showLabels={false}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					sx={{
						borderRadius: 3,
						position: 'fixed',
						left: 16,
						bottom: 16,
						width: 'calc(100% - 32px)',
						backgroundColor: '#F0F0F0',
						justifyContent: 'space-around'
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
						/>
					))}
				</BottomNavigation>
			</>
		);
	}
});

const rateRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
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

const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage
});

const navigation = [
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