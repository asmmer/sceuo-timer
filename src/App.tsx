import React from 'react';
import { Timer } from './components/Timer/Timer';
import { useSelector } from 'react-redux';
import { TRootState } from './interfaces/interfaces';

import './App.sass';

export const App: React.FC = () => {
	const { theme } = useSelector((state: TRootState) => state.app);

	return (
		<main className={`App App_${theme}`}>
			<Timer />
		</main>
	)
}