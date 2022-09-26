import React, {
	useState,
	useEffect,
} from 'react';
import './dashboard.css';
import axios from 'axios';

export default function Dashboard() {
	const [stockData, setStockData] = useState([]);
	const [temp, setTemp] = useState(0);

	useEffect(() => {
		setInterval(() => {
			setTemp((prevTemp) => prevTemp + 1);
		}, 2000);
	}, []);

	useEffect(() => {
		axios
			.get('http://localhost:5000/openingPrice')
			.then((data) => {
				// console.log(data.data.data);
				setStockData(data.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [temp]);

	// useEffect(() => {
	// 	for (let i = 0; i < stockData.length; i++) {
	// 		console.log(
	// 			stockData[i].stockData[
	// 				stockData.length - 1
	// 			]
	// 		);
	// 	}
	// }, [stockData]);

	useEffect(() => {
		console.log(stockData);
	}, [stockData]);

	return (
		<div className='dashboard'>
			<table>
				<tr>
					<th>Name</th>
					<th>Opening Price</th>
					<th>Current Price</th>
					<th>Changes</th>
				</tr>
				{stockData.map((val, key) => {
					let change =
						((val.price - val.openingPrice) *
							100) /
						val.openingPrice;
					return (
						<tr key={key}>
							<td>{val.ticker}</td>
							<td>{val.openingPrice}</td>
							<td>{val.price}</td>
							{change > 0 ? (
								<td style={{ color: 'green' }}>
									{change}%
								</td>
							) : (
								<td style={{ color: 'red' }}>
									{change}%
								</td>
							)}
						</tr>
					);
				})}
			</table>
		</div>

		// <div>
		// 	<div
		// 		style={{
		// 			display: 'flex',
		// 			flexWrap: 'wrap',
		// 		}}>
		// 		{stockData.map((stck) => {
		// 			return (
		// 				<div
		// 					style={{
		// 						width: '150px',
		// 						height: '150px',
		// 						borderStyle: 'groove',
		// 					}}>
		// 					<p>{stck.ticker}</p>
		// 					<p>
		// 						Opening Price: {stck.openingPrice}
		// 					</p>
		// 					<p>Current Price: {stck.price}</p>
		// 				</div>
		// 			);
		// 		})}
		// 	</div>
		// </div>
	);
}
