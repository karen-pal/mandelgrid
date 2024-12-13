import { useState, useEffect } from "react";
import Papa from "papaparse";
// import Grid from "./assets/image.png";
import CircleAnimation from "./components/CircleAnimation";
import "./App.css";

const THIRTY_MINS = 30 * 60_000;

type Data<Type> = {
	[Property in keyof Type]: string;
};

type ComputeData = {
	Time: string;
	alice: string;
};

type NetworkData = {
	Time: string;
	outgoing: string;
};

type CernData<Type> = {
	data: Data<Type>[];
	lastDatapointIndex: number;
	dataDelta: number;
	timeDelta: number;
};

function update<Type>(
	cernData: CernData<Type>,
	setCernData: React.Dispatch<React.SetStateAction<CernData<Type>>>,
	t: keyof Type,
) {
	for (
		let i = cernData.lastDatapointIndex;
		i < cernData.data.length - 1;
		i++
	) {
		const previousVal = cernData.data[i - 1];
		const val = cernData.data[i];
		let delta = 0;

		if (t === "alice") {
			// Compute
			delta = Math.abs(Number(val[t]) - Number(previousVal[t]));
		}
		if (t === "outgoing") {
			// Network
			// Example: 450 Mb
			const prev = previousVal[t].split(" ")[0];
			const v = val[t].split(" ")[0];
			delta = Math.abs(Number(v) - Number(prev));
		}

		if (delta >= cernData.dataDelta) {
			setCernData((cd) => ({ ...cd, lastDatapointIndex: i + 1 }));
			return;
		}
	}
}

function App() {
	const [computeData, setComputeData] = useState<CernData<ComputeData>>({
		data: [],
		lastDatapointIndex: 1,
		dataDelta: 9_000,
		timeDelta: THIRTY_MINS,
	});

	const [networkData, setNetworkData] = useState<CernData<NetworkData>>({
		data: [],
		lastDatapointIndex: 1,
		dataDelta: 30,
		timeDelta: THIRTY_MINS,
	});

	useEffect(() => {
		Papa.parse("/mandelgrid/csv/compute.csv", {
			download: true,
			header: true,
			complete: ({ data }) => setComputeData((cd) => ({ ...cd, data })),
		});
		Papa.parse("/mandelgrid/csv/network.csv", {
			download: true,
			header: true,
			complete: ({ data }) => setNetworkData((nd) => ({ ...nd, data })),
		});
	}, []);

	useEffect(() => {
		setTimeout(() => update(computeData, setComputeData, "alice"), 15_000);
	}, [computeData]);

	useEffect(() => {
		setTimeout(
			() => update(networkData, setNetworkData, "outgoing"),
			15_000 / 2,
		);
	}, [networkData]);

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				gridTemplateRows: "repeat(3, 1fr)",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				height: "100vh",
			}}
		>
			<div
				id="stats"
				style={{
					gridRow: "2",
					gridColumn: "1",
					justifySelf: "center",
					zIndex: "10",
					display: "grid",
					gap: "2rem",
				}}
			>
				<div>
					<p>
						<strong>Users</strong>
					</p>
					<p>20,000</p>
				</div>
				<div>
					<p>
						<strong>Storage</strong>
					</p>
					<p>50,000 Pb</p>
				</div>
				<div>
					<p>
						<strong>RAM</strong>
					</p>
					<p>32,000 Tb</p>
				</div>
			</div>
			{/* <CircleAnimation color="#ff9706" time={2000} /> */}
			<div style={{ gridColumn: "1 / -1", gridRow: "1 / -1" }}>
				<CircleAnimation color="#0017e2" time={800} />
			</div>
			<div
				id="deltas"
				style={{
					gridColumn: "3",
					gridRow: "1",
					zIndex: 10,
					display: "flex",
					gap: "3rem",
				}}
			>
				<div>
					<p className="text-orange">
						<strong>Network</strong>
					</p>
					<p>30 Mb</p>
				</div>
				<div>
					<p className="text-blue">
						<strong>Compute</strong>
					</p>
					<p>8,000</p>
				</div>
			</div>
			<div
				id="credits"
				style={{
					gridColumn: "1",
					gridRow: "3",
					justifySelf: "center",
					alignSelf: "center",
					zIndex: "10",
				}}
			>
				<p>
					<strong>Equípo técnico:</strong>
				</p>
				<p>Karen Palacio</p>
				<p>Natalí Palacio</p>
				<p>Lucas Ciancaglini</p>
			</div>
		</div>
	);
}

export default App;
