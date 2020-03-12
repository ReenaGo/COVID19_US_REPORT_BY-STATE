import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
	popover: {
		pointerEvents: 'none',
	},
	paper: {
		padding: theme.spacing(1),
	},
}));

const Path = styled.path`
	  fill: #f5f2f2;
	  background-color: blue;
	  &:hover {
		  fill: red;
	  }
	`;
const Div = styled.div`
	 text-align: center;
 `;

export default function Map() {
	const classes = useStyles();
	const allStatesRef = useRef({})
	const dispatch = useDispatch()
	const data = useSelector((state) => state.data)

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [hoveredState, setHoveredState] = React.useState({});

	allStatesRef.current = []
	useEffect(() => {
		axios.get('./Data.json')
			.then(res => {
				dispatch({ type: "LOAD_DATA", payload: res.data })
			})
	}, [dispatch])

	const handlePopoverOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const eachState = data.map((currentState, index) => {
		return (
			<Path
				key={index}
				onMouseEnter={(e) => {
					var currentStateHoveredOver = {
						name: currentState.name,
						cases: currentState.cases,
						deaths: currentState.deaths,
						recoveries: currentState.recoveries
					}
					setHoveredState(currentStateHoveredOver)
					handlePopoverOpen(e)
				}}
				onMouseLeave={(e) => {
					setHoveredState({})
					handlePopoverClose(e)

				}}
				id={currentState.name || null}
				d={currentState.path || null}
				fill='#f5f2f2'
				aria-owns={open ? currentState.name : undefined}
				aria-haspopup="true"
			/>
		)
	})

	return (
		<Div>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				width='920'
				height='700'
				viewBox='0 0 1920 1080'>
				<defs>
					<clipPath id='clip-Artboard_1'>
						<rect width='1920' height='1080' />
					</clipPath>
				</defs>
				<g
					id='Artboard_1'
					data-name='Artboard 1'
					clipPath='url(#clip-Artboard_1)'>
					<rect width='1920' height='1080' fill='#fff' />
					{eachState}
					<Popover
						id={hoveredState.name}
						className={classes.popover}
						classes={{
							paper: classes.paper,
						}}
						open={open}
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						onClose={handlePopoverClose}
						disableRestoreFocus
					>
						<Typography>{hoveredState.name}</Typography>
						<Typography>Cases: {hoveredState.cases}</Typography>
						<Typography>Deaths: {hoveredState.deaths}</Typography>
						<Typography>Recoveries: {hoveredState.recoveries}</Typography>

					</Popover>
				</g>
			</svg>
		</Div>
	);
}
