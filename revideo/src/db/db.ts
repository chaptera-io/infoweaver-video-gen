import {initializeApp, applicationDefault, cert} from 'firebase-admin/app';
import {getFirestore, Timestamp, FieldValue, Filter} from 'firebase-admin/firestore';
import {Script, VideoGenerateJob} from '../video-render/data';

import * as AWS from 'aws-sdk';
AWS.config.update(process.env.AWS_KEY ?? require('./aws-key.json'));

import fs = require('fs');

var serviceAccount = process.env.FIREBASE_CREDS ?? require('./firebase-key.json');
initializeApp({
	credential: cert(serviceAccount),
});

class Database {
	db: FirebaseFirestore.Firestore;

	constructor() {
		this.db = getFirestore();
	}

	async getScript(id: string): Promise<Script> {
		let doc = await this.db.collection('scripts').doc(id).get();
		return {...doc.data(), id: doc.id} as Script;
	}

	async updateScriptSections(id: string, sections: Script['sections']) {
		await this.db.collection('scripts').doc(id).update({sections});
	}

	async getNextJob(): Promise<VideoGenerateJob | null> {
		let query = this.db
			.collection('jobs')
			.where('status', '==', 'queued')
			.orderBy('createdAt', 'asc')
			.limit(1);
		let snap = await query.get();
		if (snap.empty) return null;

		let doc = snap.docs[0];
		return {...doc.data(), id: doc.id} as VideoGenerateJob;
	}

	async updateJobStatus(id: string, status: VideoGenerateJob['status']) {
		await this.db.collection('jobs').doc(id).update({status});
	}

	// async test() {
	// 	let dataToSave = videoData;

	// 	let res = await this.db.collection('scripts').add({
	// 		tag: 'globalpoliticaleconomy/ch9',
	// 		sections: dataToSave,
	// 	});
	// 	console.log('created doc', res.id);
	// }
}

export const db = new Database();

export async function uploadToS3(rootFolder: string, filePath: string, scriptId: string) {
	const s3 = new AWS.S3();

	// extract the pure filename from the parth
	const fileName = filePath.split('/').pop();

	const data = fs.readFileSync(filePath);

	const key = `${scriptId}/${fileName}`;

	// put the data to s3
	const params = {
		Bucket: 'berkeley-hackathon',
		Key: `${rootFolder}/${key}`,
		Body: data,
	};

	// upload as a promise
	await s3.upload(params).promise();
	console.log('uploaded file', filePath);
	return key;
}
