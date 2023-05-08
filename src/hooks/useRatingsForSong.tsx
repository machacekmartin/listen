import { useEffect, useState } from 'react';
import { getDocs, query, where } from 'firebase/firestore';

import { Song, songsRatingsCollection } from '../firebase';

const useRatingsForSong = (song: Song) => {
	const [ratings, setRatings] = useState<boolean[]>();

	useEffect(() => {
		const fetch = async () => {
			const match = await getDocs(
				query(songsRatingsCollection, where('song_id', '==', song.id))
			);

			setRatings(match.docs.map(doc => doc.data().rating));
		};

		fetch();
	}, []);

	return ratings;
};

export default useRatingsForSong;
