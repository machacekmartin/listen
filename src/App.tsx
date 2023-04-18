import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	CssBaseline
} from '@mui/material';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route
} from '@tanstack/react-router';

import ButtonLink from './components/ButtonLink';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

const rootRoute = new RootRoute({
	component: () => (
		<>
			<CssBaseline />

			<AppBar position="sticky">
				<Toolbar>
					<ButtonLink to="/">Home</ButtonLink>
					<ButtonLink to="/login">Login</ButtonLink>
				</Toolbar>
			</AppBar>

			<Outlet />
		</>
	)
});

const homeRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: HomePage
});

const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage
});

// const notFoundRoute = new Route({
// 	getParentRoute: () => rootRoute,
// 	path: '*',
// 	component: NotFound
// });

const routeTree = rootRoute.addChildren([
	homeRoute,
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
