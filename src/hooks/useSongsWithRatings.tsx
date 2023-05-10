import { useEffect, useState } from 'react';
import { getDocs, query } from 'firebase/firestore';

import { Song, songsCollection, songsRatingsCollection } from '../firebase';

type SongWithRatings = Song & { ratings: { true: number; false: number } };

const useSongsWithRatings = () => {
	const [songs, setSongs] = useState<SongWithRatings[]>([]);

	useEffect(() => {
		const fetch = async () => {
			const songsMatches = await getDocs(query(songsCollection));
			const ratingsMatches = await getDocs(query(songsRatingsCollection));

			const songs = songsMatches.docs.map(song => song.data());
			const ratings = ratingsMatches.docs.map(rating => rating.data());

			const songsWithRatings = songs.map<SongWithRatings>(song => {
				const matchingRatings = ratings.filter(
					rating => rating.song_id === song.id
				);
				return {
					...song,
					ratings: {
						true: matchingRatings.filter(rating => rating.rating).length,
						false: matchingRatings.filter(rating => !rating.rating).length
					}
				};
			});

			setSongs(songsWithRatings);
		};

		fetch();
	}, []);

	return songs;
};

export default useSongsWithRatings;
