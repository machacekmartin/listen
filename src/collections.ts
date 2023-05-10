import {
	CollectionReference,
	collection,
	getFirestore
} from 'firebase/firestore';

import { Rating } from './types';

export const ratingsCollection = collection(
	getFirestore(),
	'ratings'
) as CollectionReference<Rating>;
