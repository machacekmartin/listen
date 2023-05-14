import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';

import { Rating } from '../types';
import { userSongsQuery } from '../collections';
import { auth } from '../firebase';

const useMySongs = () => {
	const [songsRatings, setSongsRatings] = useState<Rating[]>([]);

	useEffect(() => {
		const fetch = async () => {
			if (auth.currentUser === null) return;

			const q = userSongsQuery(auth.currentUser.uid);
			const ratingsMatches = await getDocs(q);
			const ratings = ratingsMatches.docs.map(rating => rating.data());

			// filter unique
			const unique = ratings.filter(
				(item, index, array) =>
					array.findIndex(obj => obj.song_id === item.song_id) === index
			);

			setSongsRatings(unique);
		};

		fetch();
	}, []);

	return songsRatings;
};

export default useMySongs;
