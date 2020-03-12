import React from 'react';
import Map from './Map/Map';
import styled from 'styled-components';
import CountryData from './Aggregated/Aggregated'

const Div = styled.div`
	  display: flex;
	  flex-direction: column;
	 text-align:center
  `;


function App() {

	return (
		<div className='App'>
			<CountryData />
			<Map />
		</div>
	);
}
export default App;
