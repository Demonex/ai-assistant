export interface AudioTranscription {
	transcription: string;
	summary: Summary;
	processing_time: ProcessingTime;
}

export interface Summary {
	overview: string;
	main_points: unknown[];
	key_insights: unknown[];
	action_items_decisions: unknown[];
	open_questions_next_steps: unknown[];
	conclusions: unknown[];
	full_text: string;
	status: string;
}

export interface ProcessingTime {
	transcription: number;
	summarization: number;
	total: number;
}

export interface AudioReponse {
	transcription: AudioTranscription["transcription"];
	fullText: Summary["full_text"];
	status: Summary["status"];
}
