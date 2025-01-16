export interface RequestFlowConfig {
	name: string;
	description: string;
	icon: string;
	icon_bg_color: any;
	gradient: string;
	data: Data;
	is_component: boolean;
	updated_at: string;
	webhook: boolean;
	endpoint_name: any;
	tags: any;
	id: string;
	user_id: string;
	folder_id: string;
}

interface Data {
	nodes: Node[];
	edges: Edge[];
	viewport: Viewport;
}

interface Node {
	data: Data2;
	dragging: boolean;
	height: number;
	id: string;
	position: Position;
	positionAbsolute: PositionAbsolute;
	selected: boolean;
	type: string;
	width: number;
	resizing?: boolean;
	style?: Style;
}

interface Data2 {
	description?: string;
	display_name?: string;
	id: string;
	node: Node2;
	type: string;
}

interface Node2 {
	base_classes?: string[];
	beta?: boolean;
	conditional_paths?: any[];
	custom_fields?: CustomFields;
	description: string;
	display_name: string;
	documentation: string;
	edited?: boolean;
	field_order?: string[];
	frozen?: boolean;
	icon?: string;
	legacy?: boolean;
	lf_version?: string;
	metadata?: Metadata;
	output_types?: any[];
	outputs?: Output[];
	pinned?: boolean;
	template: Template;
	error: any;
	full_path: any;
	is_composition: any;
	is_input: any;
	is_output: any;
	name?: string;
	tool_mode?: boolean;
}

interface CustomFields {
	template?: string[];
}

type Metadata = {}

interface Output {
	types: string[];
	selected: string;
	name: string;
	display_name: string;
	method: string;
	value: string;
	cache: boolean;
	required_inputs?: string[];
	hidden?: boolean;
}

interface Template {
	_type?: string;
	background_color?: BackgroundColor;
	chat_icon?: ChatIcon;
	code?: Code;
	files?: Files;
	input_value?: InputValue;
	sender?: Sender;
	sender_name?: SenderName;
	session_id?: SessionId;
	should_store_message?: ShouldStoreMessage;
	text_color?: TextColor;
	data?: Data3;
	sep?: Sep;
	template?: Template2;
	context?: Context;
	question?: Question;
	chunk_overlap?: ChunkOverlap;
	chunk_size?: ChunkSize;
	data_inputs?: DataInputs;
	separator?: Separator;
	backgroundColor?: string;
	data_template?: DataTemplate;
	base_url?: BaseUrl;
	model?: Model;
	embedding?: Embedding;
	ingest_data?: IngestData;
	api_key?: ApiKey;
	collection_name?: CollectionName;
	content_payload_key?: ContentPayloadKey;
	distance_func?: DistanceFunc;
	grpc_port?: GrpcPort;
	host?: Host;
	metadata_payload_key?: MetadataPayloadKey;
	number_of_results?: NumberOfResults;
	path?: Path;
	port?: Port;
	prefix?: Prefix;
	search_query?: SearchQuery;
	timeout?: Timeout;
	url?: Url;
	output_parser?: OutputParser;
	format?: Format;
	metadata?: Metadata2;
	mirostat?: Mirostat;
	mirostat_eta?: MirostatEta;
	mirostat_tau?: MirostatTau;
	model_name?: ModelName;
	num_ctx?: NumCtx;
	num_gpu?: NumGpu;
	num_thread?: NumThread;
	repeat_last_n?: RepeatLastN;
	repeat_penalty?: RepeatPenalty;
	stop_tokens?: StopTokens;
	stream?: Stream;
	system?: System;
	system_message?: SystemMessage;
	tags?: Tags;
	temperature?: Temperature;
	tfs_z?: TfsZ;
	top_k?: TopK;
	top_p?: TopP;
	verbose?: Verbose;
	concurrency_multithreading?: ConcurrencyMultithreading;
	silent_errors?: SilentErrors;
	use_multithreading?: UseMultithreading;
}

interface BackgroundColor {
	_input_type: string;
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	tool_mode?: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface ChatIcon {
	_input_type: string;
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	tool_mode?: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface Code {
	type: string;
	required: boolean;
	placeholder: string;
	list: boolean;
	show: boolean;
	multiline: boolean;
	value: string;
	fileTypes: any[];
	file_path: string;
	password: boolean;
	name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	load_from_db: boolean;
	title_case: boolean;
}

interface Files {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	fileTypes: string[];
	file_path: string;
	info: string;
	list: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface InputValue {
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type?: string;
	multiline?: boolean;
}

interface Sender {
	_input_type?: string;
	advanced: boolean;
	combobox?: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	name: string;
	options: string[];
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	tool_mode?: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface SenderName {
	_input_type?: string;
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	tool_mode?: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface SessionId {
	_input_type?: string;
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	tool_mode?: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface ShouldStoreMessage {
	_input_type?: string;
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	list: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: boolean;
}

interface TextColor {
	_input_type: string;
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	tool_mode?: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface Data3 {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface Sep {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	list: boolean;
	load_from_db: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface Template2 {
	trace_as_metadata?: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type?: string;
	trace_as_input?: boolean;
	input_types?: string[];
	multiline?: boolean;
}

interface Context {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	field_type: string;
	fileTypes: any[];
	file_path: string;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	multiline: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	type: string;
	value: string;
}

interface Question {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	field_type: string;
	fileTypes: any[];
	file_path: string;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	multiline: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	type: string;
	value: string;
}

interface ChunkOverlap {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	list: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: number;
}

interface ChunkSize {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	list: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: number;
}

interface DataInputs {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface Separator {
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface DataTemplate {
	_input_type: string;
	advanced: boolean;
	display_name: string;
	dynamic: boolean;
	info: string;
	input_types: string[];
	list: boolean;
	load_from_db: boolean;
	name: string;
	placeholder: string;
	required: boolean;
	show: boolean;
	title_case: boolean;
	tool_mode: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	type: string;
	value: string;
}

interface BaseUrl {
	tool_mode?: boolean;
	trace_as_input?: boolean;
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types?: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Model {
	tool_mode: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Embedding {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface IngestData {
	tool_mode: boolean;
	trace_as_metadata: boolean;
	list: boolean;
	trace_as_input: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface ApiKey {
	load_from_db: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	password: boolean;
	type: string;
	_input_type: string;
}

interface CollectionName {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface ContentPayloadKey {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface DistanceFunc {
	tool_mode: boolean;
	trace_as_metadata: boolean;
	options: string[];
	combobox: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface GrpcPort {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: number;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Host {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface MetadataPayloadKey {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface NumberOfResults {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: number;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Path {
	trace_as_metadata: boolean;
	load_from_db?: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
	file_path?: string;
	fileTypes?: string[];
}

interface Port {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: number;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Prefix {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface SearchQuery {
	tool_mode: boolean;
	trace_as_input: boolean;
	multiline: boolean;
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Timeout {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Url {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface OutputParser {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Format {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Metadata2 {
	trace_as_input: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: Value;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

type Value = {}

interface Mirostat {
	tool_mode: boolean;
	trace_as_metadata: boolean;
	options: string[];
	combobox: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	real_time_refresh: boolean;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface MirostatEta {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface MirostatTau {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface ModelName {
	tool_mode: boolean;
	trace_as_metadata: boolean;
	options: string[];
	combobox: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	refresh_button: boolean;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface NumCtx {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface NumGpu {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface NumThread {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface RepeatLastN {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface RepeatPenalty {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface StopTokens {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Stream {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: boolean;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface System {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface SystemMessage {
	tool_mode: boolean;
	trace_as_input: boolean;
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	input_types: string[];
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Tags {
	trace_as_metadata: boolean;
	load_from_db: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Temperature {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: number;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface TfsZ {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface TopK {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface TopP {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: string;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Verbose {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: boolean;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface ConcurrencyMultithreading {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: number;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface SilentErrors {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: boolean;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface UseMultithreading {
	trace_as_metadata: boolean;
	list: boolean;
	required: boolean;
	placeholder: string;
	show: boolean;
	name: string;
	value: boolean;
	display_name: string;
	advanced: boolean;
	dynamic: boolean;
	info: string;
	title_case: boolean;
	type: string;
	_input_type: string;
}

interface Position {
	x: number;
	y: number;
}

interface PositionAbsolute {
	x: number;
	y: number;
}

interface Style {
	height: number;
	width: number;
}

interface Edge {
	animated: boolean;
	className: string;
	data: Data4;
	id: string;
	source: string;
	sourceHandle: string;
	target: string;
	targetHandle: string;
	selected?: boolean;
}

interface Data4 {
	sourceHandle: SourceHandle;
	targetHandle: TargetHandle;
}

interface SourceHandle {
	dataType: string;
	id: string;
	name: string;
	output_types: string[];
}

interface TargetHandle {
	fieldName: string;
	id: string;
	inputTypes: string[];
	type: string;
}

interface Viewport {
	x: number;
	y: number;
	zoom: number;
}
