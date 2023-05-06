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

		const shouldShowNavigation = (): boolean =>
			router.state.currentLocation.pathname !== introRoute.fullPath;

		const redirect = (route: Route) => {
			router.navigate({ to: route.fullPath });
		};

		return (
			<>
				<CssBaseline />

				<AuthGuard
					fail={<LoginPage />}
					success={
						<>
							<Outlet />
							{shouldShowNavigation() && <Navigation onSelect={redirect} />}
						</>
					}
				/>
			</>
		);
	}
});

const introRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/intro',
	component: IntroPage,
	beforeLoad: ({ router }) => {
		if (localStorage.getItem('intro_done') === 'true') {
			router.navigate({ to: rateRoute.fullPath });
		}
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
		router.navigate({ to: introRoute.fullPath });
	}
});

const routeTree = rootRoute.addChildren([
	introRoute,
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
