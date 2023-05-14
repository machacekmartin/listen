import { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';

import { Song } from '../types';
import { hasAlreadyRated } from '../actions/hasAlreadyRated';

const useRandomSong = (): [Song | null, () => void] => {
	const [song, setSong] = useState<Song | null>(null);

	useEffect(() => {
		const checkIfUserRated = async (id: number): Promise<boolean> => {
			if (await hasAlreadyRated(id.toString())) {
				console.log('--- Provided ID already rated, trying again...');
				return true;
			} else {
				console.log('--- Provided ID is correct');
				return false;
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

			const id = Math.floor(Math.random() * 10000000);

			const data = await generateSongData(id);
			console.log(`--- Got API data`);

			if (data.error || data.preview === '') {
				console.log('--- Data is invalid, trying again...');
				fetchRandomSong();
				return;
			}

			if (await checkIfUserRated(id)) {
				fetchRandomSong();
				return;
			}

			console.log(`--- Found valid id: ${id}`);
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
