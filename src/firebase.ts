import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	User
} from 'firebase/auth';

initializeApp({
	apiKey: 'AIzaSyDaoMsnwBMSUgUpYyjWWkE0DHMF_mg5_eU',
	authDomain: 'listen-474c9.firebaseapp.com',
	projectId: 'listen-474c9',
	storageBucket: 'listen-474c9.appspot.com',
	messagingSenderId: '931174173340',
	appId: '1:931174173340:web:680caf089b8b0b11a0fb59'
});

export const auth = getAuth();

export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signOut = () => authSignOut(auth);

export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);
