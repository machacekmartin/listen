import {
	CollectionReference,
	collection,
	getFirestore,
	query,
	where
} from 'firebase/firestore';

import { Rating } from './types';

export const ratingsCollection = collection(
	getFirestore(),
	'ratings'
) as CollectionReference<Rating>;

export const userSongsQuery = (user_id: string | undefined) =>
	query(
		ratingsCollection,
		where('user_id', '==', user_id),
		where('rating', '==', true)
	);
