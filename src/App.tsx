import { useState, useEffect } from "react";
import Papa from "papaparse";
import Grid from "./assets/image.png";
import CircleAnimation from "./components/CircleAnimation";

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* <CircleAnimation color="#ff9706" time={2000} /> */}
      <CircleAnimation color="#0017e2" time={800} />

      {/* <ul>
        {computeData.data.map((d) => (
          <li>{d["alice"]}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
