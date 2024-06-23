import {renderVideo} from '@revideo/renderer';
import {ScriptSection} from './data';
import {db, uploadToS3} from '../db/db';

async function render(scriptSections: ScriptSection[], scriptId: string): Promise<string> {
	console.log('Rendering video...');

	// This is the main function that renders the video
	const file = await renderVideo({
		projectFile: './src/video-render/project.ts',
		variables: {
			scriptSections,
			scriptId,
		},
		settings: {logProgress: true, workers: 2},
	});

	console.log(`Rendered video to ${file}`);

	return file;
}

export async function renderFromScript(scriptId: string) {
	// 0. retrieve script
	let script = await db.getScript(scriptId);

	// 1. render video
	let file = await render(script.sections, scriptId);

	// 2. save video to S3
	await uploadToS3('video', file, scriptId);
}

// renderFromScript('WuaGXHvaDA8kwrnGvanl');
