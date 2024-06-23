import {Gradient, Img, Layout, Line, Rect, Spline, Txt, makeScene2D, Audio} from '@revideo/2d';
import {all, createRef, ReferenceReceiver, useScene, Vector2, waitFor} from '@revideo/core';
import {ScriptSection} from '../data';

/**
 * Some example data to use in the scene when no data is provided
 */

const lens = [
	13.056, 15.408, 8.952, 8.088, 3.936, 4.008, 3.312, 6.384, 12.096, 12.192, 10.944, 10.152, 9.336,
	6.816, 17.064, 11.448, 9.096, 9.072, 10.944, 5.664, 9.624, 7.824, 10.032, 9.432, 8.688, 10.104,
	9.312, 8.136, 9.648, 8.736, 8.904, 9.96, 10.848, 8.064, 10.104, 7.8, 10.104, 8.424, 10.584,
];

export default makeScene2D(function* (view) {
	// Get variables
	// const scriptSections: ScriptSection[] = videoData;
	const scriptSections: () => ScriptSection[] = useScene().variables.get('scriptSections', []);
	const scriptId: () => string = useScene().variables.get('scriptId', '');

	// Black background
	view.fill('#ffffff');

	let titleRef = createRef<Txt>();

	let audioIndex = 0;

	for (let slide of scriptSections()) {
		view.add(
			<>
				<Txt
					fontFamily={'Roboto'}
					text={slide.slideTitle}
					fill={'#000000'}
					x={-520}
					y={-395}
					fontSize={40}
					fontWeight={600}
					ref={titleRef}
				/>
			</>,
		);

		let numPoints = slide.bulletPoints.length;

		// create refs for each bullet point
		let refs = new Array(numPoints).fill(numPoints).map(() => createRef<Txt>());
		let audioRef = createRef<Audio>();

		for (let i = 0; i < numPoints; i++) {
			let bulletPoint = slide.bulletPoints[i];

			yield view.add(
				<Audio
					src={`https://berkeley-hackathon.s3.us-east-2.amazonaws.com/audio/${scriptId()}/${audioIndex}.mp3`}
					play={true}
					ref={audioRef}
				/>,
			);

			audioIndex++;

			yield view.add(
				<MultilineText
					text={bulletPoint.bulletPoint}
					x={-300}
					y={-300 + i * 50}
					fontSize={30}
					lineHeight={40}
					maxWidth={800}
					ref={refs[i]}
				/>,
			);

			yield* waitFor(Math.ceil(bulletPoint.len + 2));
			if (audioRef()) {
				audioRef().remove();
			}
		}

		for (let i = 0; i < numPoints; i++) {
			refs[i]().remove();
		}

		// if (audioIndex > 6) return;

		titleRef().remove();
	}
});

function MultilineText({
	text,
	x,
	y,
	fontSize,
	lineHeight,
	maxWidth,
	ref,
}: {
	text: string;
	x: number;
	y: number;
	fontSize: number;
	lineHeight: number;
	maxWidth: number;
	ref: ReferenceReceiver<any>;
}) {
	const lines = text.split('\n');
	const txtRefs = lines.map(() => createRef<Txt>());

	return (
		<Layout ref={ref} x={x} y={y}>
			{lines.map((line, i) => (
				<Txt
					ref={txtRefs[i]}
					text={line}
					fontSize={fontSize}
					lineHeight={lineHeight}
					maxWidth={maxWidth}
				/>
			))}
		</Layout>
	);
}
