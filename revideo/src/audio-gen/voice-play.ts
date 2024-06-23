import Speech from 'lmnt-node';
import {ScriptSection} from '../video-render/data';
const speech = new Speech('e487ba62b19a4a5faa3f1e78dc2ddbd4');

import {v4 as uuidv4} from 'uuid';

import fs = require('fs');
import {db, uploadToS3} from '../db/db';

const getMP3Duration = require('get-mp3-duration');

async function generateAudio(text: string, fileName: string) {
	const synthesis = await speech.synthesize(text, 'morgan');

	// a Buffer object
	const audio = synthesis.audio;

	// save the Buffer to a mp3 file
	const fs = require('fs');
	fs.writeFileSync(fileName, audio);
	console.log('generated audio', fileName);
}

async function generateAudioFiles(script: ScriptSection[]): Promise<number> {
	let i = 0;

	let promises: Promise<void>[] = [];

	for (let slide of script) {
		for (let bullet of slide.bulletPoints) {
			let narration = bullet.narration;

			if (narration) {
				const fileName = `./tmp-audio/${i}.mp3`;
				promises.push(generateAudio(narration, fileName));
				i++;
			}
		}
	}

	await Promise.all(promises);

	return i;
}

export async function generate_audio(scriptId: string) {
	// 0. retrieve script
	let script = await db.getScript(scriptId);

	// 1. generate audio files
	let numFiles = await generateAudioFiles(script.sections);

	// 2. save audios to S3
	let promises: Promise<string>[] = [];
	for (let i = 0; i < numFiles; i++) {
		let fileName = `./tmp-audio/${i}.mp3`;
		promises.push(uploadToS3('audio', fileName, scriptId));
	}

	// 3. compute and save audio lengths
	let fileKeys = await Promise.all(promises);
	let durations = [];
	for (let i = 0; i < numFiles; i++) {
		let fileName = `./tmp-audio/${i}.mp3`;
		let buffer = fs.readFileSync(fileName);
		let duration = getMP3Duration(buffer) / 1000;
		durations.push(duration);
	}

	for (let section of script.sections) {
		for (let bullet of section.bulletPoints) {
			if (bullet.narration) {
				bullet.len = durations.shift();
			}
		}
	}

	// delete every file inside tmp-audio but not the folder itself
	fs.readdirSync('./tmp-audio').forEach((file) => {
		fs.unlinkSync(`./tmp-audio/${file}`);
	});

	await db.updateScriptSections(scriptId, script.sections);
}

// generate_audio('WuaGXHvaDA8kwrnGvanl');
