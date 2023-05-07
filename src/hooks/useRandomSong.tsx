import { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';

export type Song = {
	id: number;
	title: string;
	link: string;
} | null;

const useRandomSong = (): [Song, () => void] => {
	const [song, setSong] = useState<Song>(null);

	useEffect(() => {
		const fetchRandomSong = () => {
			const id = Math.floor(Math.random() * 1000000);
			fetchJsonp(`https://api.deezer.com/track/${id}&output=jsonp`)
				.then(response => response.json())
				.then(data => {
					// fake timeout for now
					setTimeout(() => {
						if (data.error) {
							console.log('I need to reload');
							fetchRandomSong();
						} else {
							setSong(data);
						}
					}, 500);
				});
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
