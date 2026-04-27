import { TranscriptionForm } from "@/components/Transcription/TranscriptionForm.js";

const TranscriptionPage = () => {
	return (
		<div className="p-4 bg-[#fbfbfb] h-full lg:h-[calc(100vh-4rem)] overflow-auto">
			<TranscriptionForm />
		</div>
	);
};

export default TranscriptionPage;
