import { useEffect, useState } from 'react';
import { getDocs, query } from 'firebase/firestore';

import { Song, songsCollection } from '../firebase';

const useSongs = () => {
	const [songs, setSongs] = useState<Song[]>();

	useEffect(() => {
		const fetch = async () => {
			const match = await getDocs(query(songsCollection));

			setSongs(match.docs.map(doc => doc.data()));
		};

		fetch();
	}, []);

	return songs;
};

export default useSongs;
