import { getDocs, query, where } from 'firebase/firestore';

import { ratingsCollection } from '../collections';
import { auth } from '../firebase';

export const hasAlreadyRated = async (song_id: string) => {
	if (auth.currentUser === null) return false;

	const match = await getDocs(
		query(
			ratingsCollection,
			where('song_id', '==', song_id),
			where('user_id', '==', auth.currentUser.uid)
		)
	);

	return !match.empty;
};
