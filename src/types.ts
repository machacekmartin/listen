export type Rating = {
	user_id: string;
	song_id: string;
	rating: boolean;
};

export type Song = {
	id: string;
	title: string;
	preview: string;
	album: {
		cover_xl: string;
	};
	artist: {
		name: string;
	};
};

export type SongUrlReference = { url: string; id: string };
