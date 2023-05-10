import { useEffect, useState } from 'react';
import { getDocs, query } from 'firebase/firestore';

import { Rating } from '../types';
import { ratingsCollection } from '../collections';

const useSongsRatings = () => {
	const [songsRatings, setSongsRatings] = useState<Rating[]>([]);

	useEffect(() => {
		const fetch = async () => {
			const ratingsMatches = await getDocs(query(ratingsCollection));

			const ratings = ratingsMatches.docs.map(rating => rating.data());

			setSongsRatings(ratings);
		};

		fetch();
	}, []);

	return songsRatings;
};

export default useSongsRatings;
