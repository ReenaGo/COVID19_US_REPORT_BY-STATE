import React, { useState, useEffect, useRef } from 'react';
import Map from './Map/Map';
import './App.css';

const states = [
	{ name: 'Texas', cases: 50, deaths: 2, recoveries: 98 },
	{ name: 'Georgia', cases: 50, deaths: 2, recoveries: 98 }
];

function App() {
	const [data, setData] = useState({});
	const aggregatedData = useRef({});
	useEffect(() => {
		const allStates = {
			name: 'USA',
			cases: states.reduce((acc, curr) => acc + curr.cases, 0),
			deaths: states.reduce((acc, curr) => acc + curr.deaths, 0),
			recoveries: states.reduce((acc, curr) => acc + curr.recoveries, 0)
		};
		aggregatedData.current = allStates;
		setData(s => ({ ...allStates }));
	}, [setData]);

	return (
		<div className='App'>
			<header className='App-header'>
				<h1 style={{ color: 'black' }}>
					{data.name || aggregatedData.current.name}
				</h1>
				<h1 style={{ color: 'black' }}>
					{data.cases || aggregatedData.current.cases}
				</h1>
				<h1 style={{ color: 'black' }}>
					{data.deaths || aggregatedData.current.deaths}
				</h1>
				<Map
					setData={setData}
					states={states}
					aggregatedData={aggregatedData.current}
				/>
			</header>
		</div>
	);
}

export default App;
