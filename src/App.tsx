import React from 'react';
import { Timer } from './components/Timer/Timer';
import { useSelector } from 'react-redux';

import './App.sass';

export const App: React.FC = () => {
	const { theme } = useSelector((state: any) => state.app);

	return <>
		<main className={`App App_${theme}`}>
			<Timer />
		</main>
	</>
}