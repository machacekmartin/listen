import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Ayy`;
	}, [title]);
};

export default usePageTitle;
