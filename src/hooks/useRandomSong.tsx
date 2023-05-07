import { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';

export type Song = {
	id: number;
	title: string;
	preview: string;
	album: {
		cover_xl: string;
	};
	artist: {
		name: string;
	};
} | null;

const useRandomSong = (): [Song, () => void] => {
	const [song, setSong] = useState<Song>(null);

	useEffect(() => {
		const fetchRandomSong = () => {
			const id = Math.floor(Math.random() * 1000000);
			fetchJsonp(`https://api.deezer.com/track/${id}&output=jsonp`)
				.then(response => response.json())
				.then(data => {
					// query again if song with this id doesnt exist or the found song doesnt have any mp3 preview
					if (data.error || data.preview === '') {
						console.log('I need to reload');
						fetchRandomSong();
					} else {
						setSong(data);
					}
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
