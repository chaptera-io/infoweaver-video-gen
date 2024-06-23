import {generate_audio} from '../audio-gen/voice-play';
import {db} from '../db/db';
import {Script, VideoGenerateJob} from '../video-render/data';
import {renderFromScript} from '../video-render/render';

async function executeJob(job: VideoGenerateJob) {
	let script = await db.getScript(job.scriptId);

	await generate_audio(script.id);
	await renderFromScript(script.id);
}

async function main() {
	while (true) {
		console.log('checking for jobs');
		let nextJob = await db.getNextJob();

		if (!nextJob) {
			console.log('no jobs found, waiting 10 seconds');
			await new Promise((resolve) => setTimeout(resolve, 10000));
			continue;
		}

		console.log('picked up job', nextJob.id);

		// do the job
		try {
			await db.updateJobStatus(nextJob.id, 'processing');
			await executeJob(nextJob);
			await db.updateJobStatus(nextJob.id, 'done');
		} catch (err) {
			await db.updateJobStatus(nextJob.id, 'failed');
		}
	}
}

main();

function generateVideo(script: Script) {
	throw new Error('Function not implemented.');
}
