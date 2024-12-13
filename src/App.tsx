import { useState, useEffect } from "react";
import Papa from "papaparse";

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
  t: keyof Type
) {
  for (let i = cernData.lastDatapointIndex; i < cernData.data.length - 1; i++) {
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
      console.log("delta:", delta, " at point", i);
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
    Papa.parse("/csv/compute.csv", {
      download: true,
      header: true,
      complete: ({ data }) => setComputeData((cd) => ({ ...cd, data })),
    });
    Papa.parse("/csv/network.csv", {
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
      15_000 / 2
    );
  }, [networkData]);
  console.log("aaaaaaaaaaaaaaa");

  return (
    <ul>
      {computeData.data.map((d) => (
        <li>{d["alice"]}</li>
      ))}
    </ul>
  );
}

export default App;
