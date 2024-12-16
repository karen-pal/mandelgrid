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
	currentDelta: number;
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
			setCernData((cd) => ({
				...cd,
				currentDelta: delta,
				lastDatapointIndex: i + 1,
			}));
			return;
		}
	}
}

function App() {
	const [computeData, setComputeData] = useState<CernData<ComputeData>>({
		data: [],
		lastDatapointIndex: 1,
		dataDelta: 9_000,
		currentDelta: 12_498,
		timeDelta: THIRTY_MINS,
	});

	const [networkData, setNetworkData] = useState<CernData<NetworkData>>({
		data: [],
		lastDatapointIndex: 1,
		dataDelta: 30,
		currentDelta: 76,
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
				gridTemplateColumns: "1fr 2fr 1fr",
				gridTemplateRows: "repeat(3, 1fr)",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				height: "100vh",
			}}
		>
			<div
				id="title"
				style={{
					gridColumn: 2,
					gridRow: 1,
					zIndex: 10,
					justifySelf: "center",
					alignSelf: "start",
					textAlign: "center",
				}}
			>
				<h1>
					<strong>mandelgrid</strong>
				</h1>
				<h2>Karen Palacio</h2>
			</div>
			<div
				id="stats"
				style={{
					gridRow: "2",
					gridColumn: "1",
					justifySelf: "end",
					alignSelf: "center",
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
					gridRow: "2",
					zIndex: 10,
					display: "flex",
					flexDirection: "column",
					gap: "2rem",
					justifySelf: "start",
					alignSelf: "center",
				}}
			>
				<div>
					<p className="text-orange">
						<strong>Network</strong>
					</p>
					<p>Δ {networkData.currentDelta} Mb</p>
				</div>
				<div>
					<p className="text-blue">
						<strong>Compute</strong>
					</p>
					<p>Δ {computeData.currentDelta}</p>
				</div>
			</div>
			<p
				id="credits"
				style={{
					gridColumn: "3",
					gridRow: "3",
					placeSelf: "end",
					zIndex: "10",
				}}
			>
				Crafted with 💖 by{" "}
				<a href="https://portfolio-natali-pp.vercel.app/">
					Natalí Palacio
				</a>
				,&nbsp;
				<a href="https://sacules.gitlab.io/portfolio">
					Lucas Ciancaglini
				</a>
				, and&nbsp;
				<a href="https://karen-pal.github.io/about/en.html">
					Karen Palacio
				</a>
			</p>
		</div>
	);
}

export default App;
