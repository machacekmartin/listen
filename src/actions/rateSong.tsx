import { addDoc } from 'firebase/firestore';

import { ratingsCollection } from '../collections';
import { Song } from '../types';
import { auth } from '../firebase';

export const rateSong = async (song: Song, rating: boolean) => {
	if (auth.currentUser === null) return;

	addDoc(ratingsCollection, {
		user_id: auth.currentUser.uid,
		song_id: song.id.toString(),
		rating
	});
};
