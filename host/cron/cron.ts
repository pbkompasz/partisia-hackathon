import { CronJob } from 'cron';

const requestsPublishJob = new CronJob(
	'0 0 0 * * * *', // cronTime
	() => {
		console.log('Publish new requests');
	}, // onTick
	null, // onComplete
	true, // start
);

const quarterlyReportGeneratorJob = new CronJob(
	'0 0 0 1 */3 *', // cronTime
	() => {
		console.log('Generate report');
	}, // onTick
	null, // onComplete
	true, // start
);

