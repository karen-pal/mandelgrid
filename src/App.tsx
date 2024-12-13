// import { useState, useEffect } from "react";
// import Papa from "papaparse";
// import Grid from "./assets/image.png";
import CircleAnimation from "./components/CircleAnimation";
import "./App.css";

// const THIRTY_MINS = 30 * 60_000;

// type CernData = {
//   data: { Time: string; alice: number }[]; // TODO: don't hardcode these too much
//   lastDatapointIndex: number;
//   dataDelta: number;
//   timeDelta: number;
// };

// function update(
//   cernData: CernData,
//   setCernData: React.Dispatch<React.SetStateAction<CernData>>
// ) {
//   for (let i = cernData.lastDatapointIndex; i < cernData.data.length - 1; i++) {
//     const previousVal = cernData.data[i - 1]["alice"];
//     const val = cernData.data[i]["alice"];
//     const delta = Math.abs(val - previousVal);

//     if (delta >= cernData.dataDelta) {
//       console.log("delta:", delta, " at point", i);
//       setCernData((cd) => ({ ...cd, lastDatapointIndex: i + 1 }));
//       return;
//     }
//   }
// }

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function App() {
	//   const [computeData, setComputeData] = useState<CernData>({
	//     data: [],
	//     lastDatapointIndex: 1,
	//     dataDelta: 9_000,
	//     timeDelta: THIRTY_MINS,
	//   });

	//   useEffect(() => {
	//     Papa.parse(
	//       "https://raw.githubusercontent.com/karen-pal/mandelgrid/refs/heads/main/js/batch-jobs-running.csv",
	//       {
	//         download: true,
	//         header: true,
	//         complete: ({ data }) => setComputeData((cd) => ({ ...cd, data })),
	//       }
	//     );
	//   }, []);

	//   useEffect(() => {
	//     setTimeout(() => update(computeData, setComputeData), 2_000);
	//   }, [computeData]);

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
