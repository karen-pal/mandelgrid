const THIRTY_MINS = 30 * 60_000;

let batchJobs = {
	data: [],
	lastDatapointIndex: 1,
	dataDelta: 9_000,
	timeDelta: THIRTY_MINS,
};

Papa.parse("https://raw.githubusercontent.com/karen-pal/mandelgrid/refs/heads/main/js/batch-jobs-running.csv", {
	download: true,
	header: true,
	complete: (results) => {
		batchJobs.data = results.data;
	},
});

function update(batchJobs) {
	for (
		let i = batchJobs.lastDatapointIndex;
		i < batchJobs.data.length - 1;
		i++
	) {
		const previousVal = batchJobs.data[i - 1]["alice"];
		const val = batchJobs.data[i]["alice"];
		const delta = Math.abs(val - previousVal);

		if (delta >= batchJobs.dataDelta) {
			console.log("delta:", delta, " at point", i);
			batchJobs.lastDatapointIndex = i + 1;
			return;
		}
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
	while (true) {
		update(batchJobs);
		await sleep(1_000);
	}
}

main();
