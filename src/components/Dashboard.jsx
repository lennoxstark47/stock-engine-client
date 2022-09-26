import React, {
	useState,
	useEffect,
} from 'react';
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
				console.log(data.data.data);
				setStockData(data.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [temp]);

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
				}}>
				{stockData.map((stck) => {
					return (
						<div
							style={{
								width: '150px',
								height: '150px',
								borderStyle: 'groove',
							}}>
							<p>{stck.ticker}</p>
							<p>
								Opening Price: {stck.openingPrice}
							</p>
							<p>Current Price: {stck.price}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
