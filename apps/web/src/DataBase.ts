//Файл используется, как заглушка для отображений коллекций и сообщений в этой коллекции

//Вывод списка доступных коллекций
//Используется в Sidebar.tsx
export const collectionMockData = [
	{
		title: "Collection 1",
		id: 0,
	},
	{
		title: "Collection 2",
		id: 1,
	},
	{
		title: "Collection 3",
		id: 2,
	},
];

//Вывод сообщений в самой коллекции
//Используется в DialogWindow.tsx
export const messageMockData = [
	{
		id: 0,
		message: { raw: "Боба Бобович" },
		created_at: new Date().toString(),
	},
	{
		id: 1,
		response: { raw: "Биба Бобович" },
		created_at: new Date().toString(),
	},
	{
		id: 2,
		message: { raw: "Боба Бобович" },
		created_at: new Date().toString(),
	},
	{
		id: 3,
		response: { raw: "Биба Бобович" },
		created_at: new Date().toString(),
	},
	{
		id: 4,
		message: { raw: "Боба Бобович" },
		created_at: new Date().toString(),
	},
	{
		id: 5,
		response: { raw: "Биба Бобович" },
		created_at: new Date().toString(),
	},
	{
		id: 6,
		message: { raw: "Find file please!" },
		file: {
			name: "text.docx",
			size: 50000,
		},
		created_at: new Date().toString(),
	},
];
