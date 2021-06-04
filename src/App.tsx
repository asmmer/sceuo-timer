import React from 'react';
import { Timer } from 'components/Timer';
import { useSelector } from 'react-redux';
import { TRootState } from 'common/interfaces';

import './App.css';

export const App: React.FC = () => {
	const { theme } = useSelector((state: TRootState) => state.app);

	return (
		<main className="App" data-theme={theme}>
			<Timer />
		</main>
	)
}