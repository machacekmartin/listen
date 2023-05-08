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
	addDoc,
	collection,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where
} from 'firebase/firestore';

export type SongRating = {
	user_id: string;
	song_id: number;
	rating: true | false;
};

export type Song = {
	id: number;
	title: string;
	preview: string;
	album: {
		cover_xl: string;
	};
	artist: {
		name: string;
	};
};

initializeApp({
	apiKey: 'AIzaSyDaoMsnwBMSUgUpYyjWWkE0DHMF_mg5_eU',
	authDomain: 'listen-474c9.firebaseapp.com',
	projectId: 'listen-474c9',
	storageBucket: 'listen-474c9.appspot.com',
	messagingSenderId: '931174173340',
	appId: '1:931174173340:web:680caf089b8b0b11a0fb59'
});

const auth = getAuth();

export const songsRatingsCollection = collection(
	getFirestore(),
	'songs_ratings'
) as CollectionReference<SongRating>;

export const songsCollection = collection(
	getFirestore(),
	'songs'
) as CollectionReference<Song>;

export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signOut = () => authSignOut(auth);

export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

export const hasAlreadyRated = async (song_id: number) => {
	if (auth.currentUser === null) return false;

	const match = await getDocs(
		query(
			songsRatingsCollection,
			where('song_id', '==', song_id),
			where('user_id', '==', auth.currentUser.uid)
		)
	);

	return !match.empty;
};

export const allSongs = async (song_id: number) => {
	if (auth.currentUser === null) return false;

	const match = await getDocs(
		query(
			songsRatingsCollection,
			where('song_id', '==', song_id),
			where('user_id', '==', auth.currentUser.uid)
		)
	);

	return !match.empty;
};

export const rateSong = async (song: Song, rating: boolean) => {
	if (auth.currentUser === null) return;

	const matchingDocs = await getDocs(
		query(songsCollection, where('id', '==', song.id))
	);
	if (matchingDocs.empty) {
		addDoc(songsCollection, {
			id: song.id,
			title: song.title,
			preview: song.preview,
			album: {
				cover_xl: song.album.cover_xl
			},
			artist: {
				name: song.artist.name
			}
		});
	} else {
		console.log(matchingDocs);
	}

	addDoc(songsRatingsCollection, {
		user_id: auth.currentUser.uid,
		song_id: song.id,
		rating
	});
};
