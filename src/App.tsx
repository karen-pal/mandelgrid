import { useState, useEffect } from "react";
import Papa from "papaparse";

const THIRTY_MINS = 30 * 60_000;

type CernData = {
	data: { Time: string; alice: string }[];
	lastDatapointIndex: number;
	dataDelta: number;
	timeDelta: number;
};

function App() {
	const [computeData, setComputeData] = useState<CernData>({
		data: [],
		lastDatapointIndex: 1,
		dataDelta: 9_000,
		timeDelta: THIRTY_MINS,
	});

	useEffect(() => {
		Papa.parse(
			"https://raw.githubusercontent.com/karen-pal/mandelgrid/refs/heads/main/js/batch-jobs-running.csv",
			{
				download: true,
				header: true,
				complete: ({ data }) =>
					setComputeData((cd) => ({ ...cd, data })),
			},
		);
	}, []);

	return (
		<ul>
			{computeData.data.map((d) => (
				<li>{d["alice"] as string}</li>
			))}
		</ul>
	);
}

export default App;
