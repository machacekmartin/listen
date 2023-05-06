import { CssBaseline } from '@mui/material';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route,
	useRouter
} from '@tanstack/react-router';

import LoginPage from './pages/Login';
import RatePage from './pages/Rate';
import LeaderboardPage from './pages/Leaderboard';
import ProfilePage from './pages/Profile';
import IntroPage from './pages/Intro';
import Navigation from './components/Navigation';
import AuthGuard from './components/AuthGuard';

const rootRoute = new RootRoute({
	component: () => {
		const router = useRouter();

		const redirect = (route: Route) => {
			router.navigate({ to: route.fullPath });
		};

		return (
			<>
				<CssBaseline />

				{localStorage.getItem('intro_done') ? (
					<AuthGuard
						fail={<LoginPage />}
						success={
							<>
								<Outlet />
								<Navigation onSelect={redirect} />
							</>
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

const profileRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/profile',
	component: ProfilePage
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
	profileRoute,
	notFoundRoute
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
