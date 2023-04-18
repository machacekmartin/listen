import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	User,
	onAuthStateChanged
} from 'firebase/auth';

import {
	CollectionReference,
	collection,
	getFirestore
} from 'firebase/firestore';

export type SongRating = {
	user_id: number;
	song_id: string;
	rating: [1, 2, 3, 4, 5];
};

initializeApp({
	apiKey: 'AIzaSyAgu4fmJYFWZ_D7RlReTrQbN8_-afW1wHE',
	authDomain: 'listen-76460.firebaseapp.com',
	projectId: 'listen-76460',
	storageBucket: 'listen-76460.appspot.com',
	messagingSenderId: '392070418012',
	appId: '1:392070418012:web:c4c0701138494f91342099'
});

const auth = getAuth();

export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signOut = () => authSignOut(auth);

export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

export const songsRatingsCollection = collection(
	getFirestore(),
	'song_ratings'
) as CollectionReference<SongRating>;
