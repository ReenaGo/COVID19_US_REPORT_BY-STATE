import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import './Aggregated.css';

const Header = styled.header`
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  width: 50%;
	  margin: auto;
  `;

function CountryData() {
	const [allStateData, setAllStateData] = useState({})
	const aggregatedData = useRef({})
	const data = useSelector((state => state.data))
	console.log(data)
	console.log("hi")

	useEffect(() => {
		const allStates = {
			name: 'USA',
			cases: data.reduce((acc, curr) => acc + curr.cases, 0),
			deaths: data.reduce((acc, curr) => acc + curr.deaths, 0),
			recoveries: data.reduce((acc, curr) => acc + curr.recoveries, 0)
		};
		aggregatedData.current = { ...allStates };
		setAllStateData({ ...allStates })
	}, [data]);
	console.log('are we rerendering')

	return (
		<div>
			<Header className='App-header'>
				<h1 style={{ color: 'black' }}>
					{aggregatedData.current.name}
				</h1>
				<h4 style={{ color: 'black' }}>
					{aggregatedData.current.cases}
				</h4>
				<h4 style={{ color: 'black' }}>
					{aggregatedData.current.deaths}
				</h4>
				<h4 style={{ color: 'black' }}>
					{aggregatedData.current.recoveries}
				</h4>
			</Header>
		</div>
	);
}
export default CountryData;