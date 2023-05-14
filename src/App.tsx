import { Box, CssBaseline } from '@mui/material';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route,
	useNavigate
} from '@tanstack/react-router';

import LoginPage from './pages/Login';
import RatePage from './pages/Rate';
import LeaderboardPage from './pages/Leaderboard';
import ProfilePage from './pages/Profile';
import IntroPage from './pages/Intro';
import Navigation from './components/Navigation';
import AuthGuard from './components/AuthGuard';
import MySongsPage from './pages/MySongs';
import LogoutPage from './pages/Logout';

const rootRoute = new RootRoute({
	component: () => {
		const navigate = useNavigate();

		return (
			<>
				<CssBaseline />

				{localStorage.getItem('intro_done') ? (
					<AuthGuard
						fail={<LoginPage />}
						success={
							<Box p={2} height="100%" sx={{ overflowY: 'auto' }}>
								<Outlet />
								<Navigation
									onSelect={route => navigate({ to: route.fullPath })}
								/>
							</Box>
						}
					/>
				) : (
					<IntroPage />
				)}
			</>
		);
	}
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

const mySongsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/mysongs',
	component: MySongsPage
});

const logoutRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/logout',
	component: LogoutPage
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: undefined,
	beforeLoad: ({ router }) => {
		router.navigate({ to: rateRoute.fullPath });
	}
});

const routeTree = rootRoute.addChildren([
	rateRoute,
	leaderboardRoute,
	notFoundRoute,
	logoutRoute,
	mySongsRoute
]);

const router = new Router({ routeTree });
router.navigate({ to: rateRoute.fullPath });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => <RouterProvider router={router} />;

export default App;
