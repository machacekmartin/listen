import { useEffect, useState } from 'react';
import { getDocs, query } from 'firebase/firestore';

import { SongRating, songsRatingsCollection } from '../firebase';

// Hook providing logged in user information
const useLeadingSongs = (count: number) => {
	const [ratings, setRatings] = useState<[string, SongRating[]][]>();

	useEffect(() => {
		const fetch = async () => {
			const ratingsQuery = query(songsRatingsCollection);

			const ratingsSnapshot = await getDocs(ratingsQuery);

			const data = ratingsSnapshot.docs.map(doc => doc.data());

			const groupedRatings = data.reduce(
				(acc: { [key: number]: SongRating[] }, rating) => {
					const { song_id } = rating;
					if (!acc[song_id]) {
						acc[song_id] = [];
					}
					acc[song_id].push(rating);
					return acc;
				},
				{}
			);

			setRatings(
				Object.entries(groupedRatings).sort(
					([, a], [, b]) => b.length - a.length
				)
			);
		};

		fetch();
	}, []);

	return ratings;
};

export default useLeadingSongs;
