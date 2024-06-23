export type ScriptSection = {
	slideTitle: string;
	bulletPoints: {
		bulletPoint: string;
		narration: string;
		len?: number;
	}[];
}

export type Script = {
	id: string,
	tag: string,
	sections: ScriptSection[],
}

export type VideoGenerateJob = {
	id: string;
	createdAt: number,
	scriptId: string,
	status: 'queued' | 'processing' | 'done' | 'failed',
}

// export const videoData: ScriptSection[] = [
// 	{
// 		slideTitle: 'Chapter 9: Preferential Trade Agreements and the Global Trade Regime',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Preferential Trade Agreements (PTAs)',
// 				narration:
// 					"This chapter delves into Preferential Trade Agreements (PTAs), examining their impact on the global trade regime. We'll explore why they are formed, how they function, and their implications for international trade.",
// 				len: 24,
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'PTAs: Definition and Types',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Agreements granting trade preferences to members',
// 				narration:
// 					"PTAs are essentially trade agreements among a select group of countries that provide trade advantages, or preferences, to their members. These preferences can take various forms, such as reduced tariffs or easier access to each other's markets.",
// 				len: 23,
// 			},
// 			{
// 				bulletPoint: 'Regional and Transregional PTAs',
// 				narration:
// 					'PTAs can be regional, involving countries within a specific geographic area, or transregional, connecting countries across different regions.',
// 				len: 22,
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'Stages of Regional Economic Integration',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Free Trade Area (FTA)',
// 				narration:
// 					'The most common type of PTA, members eliminate tariffs among themselves but maintain individual trade policies with non-members.',
// 			},
// 			{
// 				bulletPoint: 'Customs Union (CU)',
// 				narration: 'An FTA with a common external tariff towards non-members.',
// 			},
// 			{
// 				bulletPoint: 'Common Market',
// 				narration: 'A CU allowing free movement of labor and capital among members.',
// 			},
// 			{
// 				bulletPoint: 'Economic Union',
// 				narration: 'A common market with harmonized economic policies.',
// 			},
// 			{
// 				bulletPoint: 'Political Union',
// 				narration:
// 					'An economic union with harmonized foreign and defense policies, essentially a single political entity.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'Theoretical Perspectives on PTAs',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Liberalism',
// 				narration:
// 					'Liberals view multilateralism as ideal, but accept open PTAs as a second-best solution. They believe PTAs can promote trade creation and serve as building blocks for global free trade.',
// 			},
// 			{
// 				bulletPoint: 'Neomercantilism',
// 				narration:
// 					'Neomercantilists focus on the distribution of benefits within PTAs, emphasizing power asymmetries. They argue that larger states often use PTAs to extract concessions from smaller states.',
// 			},
// 			{
// 				bulletPoint: 'Marxism',
// 				narration:
// 					'Marxists see PTAs as tools for capitalist exploitation, benefiting multinational corporations (MNCs) at the expense of labor and developing countries.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'PTAs and Globalization: A Complex Relationship',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Globalization necessitates global solutions',
// 				narration:
// 					'Globalization creates challenges, such as financial crises and environmental degradation, that require global cooperation and institutions to address effectively.',
// 			},
// 			{
// 				bulletPoint: 'Globalization can both foster and undermine PTAs',
// 				narration:
// 					'While globalization promotes interdependence and weakens state barriers, it can also make states seek refuge in smaller, like-minded groups like PTAs.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'Historical Overview of PTAs',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Early Examples',
// 				narration:
// 					'The Roman Empire and British Commonwealth preference system are examples of early transregional trade arrangements.',
// 			},
// 			{
// 				bulletPoint: 'Post-WWII: Two Waves of PTAs',
// 				narration:
// 					'The first wave (1950s-1960s) was largely regional and focused on import substitution. The second wave (1980s-present) is characterized by a proliferation of transregional agreements and greater openness to global market forces.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'Explanations for the Rise of Regional Integration',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Neomercantilist Explanations',
// 				narration:
// 					'Neomercantilists highlight the role of security concerns and power dynamics. The formation of the European Community (EC) in the context of the Cold War is a prime example.',
// 			},
// 			{
// 				bulletPoint: 'Liberal Explanations',
// 				narration:
// 					'Liberals emphasize economic factors, such as the desire for larger markets, increased investment, and a more efficient allocation of resources.',
// 			},
// 			{
// 				bulletPoint: 'Marxist Explanations',
// 				narration:
// 					'Marxists see PTAs as driven by the interests of MNCs and powerful states seeking to maximize profits and maintain dominance.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'The GATT/WTO and PTAs: A Balancing Act',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'GATT Article 24: Rules for PTAs',
// 				narration:
// 					'Article 24 of the General Agreement on Tariffs and Trade (GATT) allows for PTAs but sets conditions to ensure they are more trade-creating than trade-diverting.',
// 			},
// 			{
// 				bulletPoint: 'Trade Creation vs. Trade Diversion',
// 				narration:
// 					'PTAs can boost trade among members but may divert trade from more efficient non-members.',
// 			},
// 			{
// 				bulletPoint: 'Challenges in Regulating PTAs',
// 				narration:
// 					'The WTO has faced difficulties in effectively monitoring and regulating the growing number of PTAs and ensuring their compliance with global trade rules.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'Special Treatment for LDCs in PTAs',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'More lenient rules for PTAs among LDCs',
// 				narration:
// 					'The WTO allows developing countries more flexibility in forming PTAs, recognizing their special needs and challenges.',
// 			},
// 			{
// 				bulletPoint: 'EU Association Agreements with LDCs',
// 				narration:
// 					'The EU has historically offered non-reciprocal trade preferences to former colonies, but these agreements have faced criticism and are evolving towards greater reciprocity.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'The European Union: A Model of Regional Integration?',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'From ECSC to EU: A History of Deepening Integration',
// 				narration:
// 					'The EU has evolved from a simple coal and steel community to a full-fledged economic union with a common currency (the euro) for most of its members.',
// 			},
// 			{
// 				bulletPoint: 'Widening Integration: The Challenge of Enlargement',
// 				narration:
// 					'The EU has expanded significantly, incorporating many Central and Eastern European countries, leading to both opportunities and challenges.',
// 			},
// 			{
// 				bulletPoint: 'Theoretical Perspectives on EU Integration',
// 				narration:
// 					"Various theories, such as neofunctionalism, liberal intergovernmentalism, and constructivism, offer different explanations for the EU's evolution and challenges.",
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'Brexit: A Turning Point for the EU?',
// 		bulletPoints: [
// 			{
// 				bulletPoint: "UK's Decision to Leave the EU",
// 				narration:
// 					"In a historic referendum, the UK voted to leave the EU, raising questions about the future of European integration and the UK's place in the world.",
// 			},
// 			{
// 				bulletPoint: 'Economic and Political Implications',
// 				narration:
// 					'Brexit has significant economic and political consequences for both the UK and the EU, and its long-term impact remains uncertain.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'The North American Free Trade Agreement (NAFTA)',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Formation and Objectives',
// 				narration:
// 					'NAFTA, signed by Canada, Mexico, and the United States, aimed to eliminate trade barriers and promote economic integration in North America.',
// 			},
// 			{
// 				bulletPoint: 'Successes and Criticisms',
// 				narration:
// 					'NAFTA has boosted trade and investment but has also been criticized for job losses, inequality, and negative environmental impacts.',
// 			},
// 			{
// 				bulletPoint: 'Theoretical Perspectives on NAFTA',
// 				narration:
// 					'Liberals generally support NAFTA, while neomercantilists and Marxists highlight its unequal benefits and negative consequences for certain groups.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'The Renegotiation of NAFTA: USMCA',
// 		bulletPoints: [
// 			{
// 				bulletPoint: "Trump Administration's Push for Renegotiation",
// 				narration:
// 					'The Trump administration, critical of NAFTA, renegotiated the agreement, leading to the United States-Mexico-Canada Agreement (USMCA).',
// 			},
// 			{
// 				bulletPoint: 'Key Changes and Provisions',
// 				narration:
// 					"USMCA includes provisions on labor standards, rules of origin, and dispute settlement, reflecting the Trump administration's focus on protecting American jobs and industries.",
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'Mercosur: Regional Integration in South America',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Formation and Goals',
// 				narration:
// 					'Mercosur, comprising Argentina, Brazil, Paraguay, and Uruguay, aimed to establish a common market in South America.',
// 			},
// 			{
// 				bulletPoint: 'Progress and Challenges',
// 				narration:
// 					'Mercosur has faced obstacles, including economic crises, political instability, and the dominance of Brazil, hindering its progress towards deeper integration.',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'The Trans-Pacific Partnership (TPP) and CPTPP',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'Ambitious Transregional Trade Agreement',
// 				narration:
// 					'The TPP, involving 12 Pacific Rim countries, aimed to liberalize trade and investment beyond WTO standards.',
// 			},
// 			{
// 				bulletPoint: 'U.S. Withdrawal and the Emergence of CPTPP',
// 				narration:
// 					'President Trump withdrew the U.S. from TPP. The remaining countries formed the Comprehensive and Progressive Agreement for Trans-Pacific Partnership (CPTPP).',
// 			},
// 		],
// 	},
// 	{
// 		slideTitle: 'Conclusion: PTAs in the Global Trade Regime',
// 		bulletPoints: [
// 			{
// 				bulletPoint: 'PTAs: Stepping Stones or Stumbling Blocks?',
// 				narration:
// 					'The debate over whether PTAs complement or undermine the multilateral trading system continues. There are valid arguments on both sides.',
// 			},
// 			{
// 				bulletPoint: 'The Future of PTAs',
// 				narration:
// 					'As globalization progresses, PTAs are likely to remain prominent features of the global trade landscape, and their relationship with the WTO will continue to evolve.',
// 			},
// 		],
// 	},
// ];
