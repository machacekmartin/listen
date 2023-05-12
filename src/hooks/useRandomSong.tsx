import { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';

import { Song } from '../types';
import { hasAlreadyRated } from '../actions/hasAlreadyRated';

const useRandomSong = (): [Song | null, () => void] => {
	const [song, setSong] = useState<Song | null>(null);

	useEffect(() => {
		const generateValidId = async (): Promise<number> => {
			const id = Math.floor(Math.random() * 10000000);

			if (await hasAlreadyRated(id.toString())) {
				console.log('--- Provided ID already rated, trying again...');
				return generateValidId();
			} else {
				console.log('--- Provided ID is correct');
				return id;
			}
		};

		const generateSongData = async (id: number) => {
			const response = await fetchJsonp(
				`https://api.deezer.com/track/${id}&output=jsonp`
			);
			return await response.json();
		};

		const fetchRandomSong = async () => {
			if (song !== null) return;

			const id = await generateValidId();
			console.log(`--- Found valid id: ${id}`);
			const data = await generateSongData(id);
			console.log(`--- Got API data`);

			if (data.error || data.preview === '') {
				console.log('--- Data is invalid, trying again...');
				fetchRandomSong();
				return;
			}

			console.log('--------------------------');
			setSong(data);
		};

		if (song === null) {
			fetchRandomSong();
		}
	}, [song]);

	const newSong = () => {
		setSong(null);
	};

	return [song, newSong];
};

export default useRandomSong;
