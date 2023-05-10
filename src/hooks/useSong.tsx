import { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';

import { Song } from '../types';

const useSong = (songId: Song['id']): Song | null => {
	const [song, setSong] = useState<Song | null>(null);

	useEffect(() => {
		const fetch = async () => {
			const response = await fetchJsonp(
				`https://api.deezer.com/track/${songId}&output=jsonp`
			);
			const data = await response.json();
			data.id = data.id.toString();
			setSong(data);
		};

		if (song === null) {
			fetch();
		}
	}, [song]);

	return song;
};

export default useSong;
