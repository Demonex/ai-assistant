import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class CrmService {
	async createUserInCrm(userData: any): Promise<any> {
		const crmCreateUserUrl = process.env.CRM_CREATE_USER_URL;
		const token = process.env.CRM_TOKEN;

		const crmRequestData = {
			template: { id: 1 },
			sourceObjectId: "0c091b1f-a735-44e9-a56c-43435e7a40b6",
			sourceDataVersion: "AADJIgAAAAA=",
			name: userData.firstName,
			midname: userData.middleName || "",
			lastname: userData.lastName,
			gender: "Male",
			description: "Передано из сервиса Refify.ru",
			address: "",
			site: "",
			email: userData.email,
			skype: "",
			position: "",
			group: { id: 1 },
			isCompany: false,
			isDeleted: false,
			birthDate: { date: "01-12-1990" },
			phones: [{ number: userData.phone, type: 1 }],
			companies: [],
			contacts: [],
			customFieldData: [],
			supervisors: {
				users: [
					{
						id: "user:45", // Уникальный идентификатор супервизора "Рудольф"
					},
				],
			},
		};

		try {
			const response = await axios.post(crmCreateUserUrl, crmRequestData, {
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			console.error("Error creating user in CRM:", error.message);
			throw new HttpException(
				"Failed to create user in CRM",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async createTaskInCrm(taskData: any): Promise<any> {
		const crmCreateTaskUrl = process.env.CRM_CREATE_TASK_URL;
		const token = process.env.CRM_TOKEN;

		// Формируем данные для CRM
		const crmTaskData = {
			name: taskData.name,
			description: taskData.description || "Передано из Rifify.ru/auto", // Описание
			project: taskData.project || { id: 7382 }, // ID проекта "Регистрация"
			template: taskData.template || { id: 7235 }, // ID шаблона "Регистрация"
			assignees: {
				users: [
					{ id: "user:45" }, // ID пользователя, назначенного на задачу "Рудольф"
				],
			},
		};

		try {
			const response = await axios.post(crmCreateTaskUrl, crmTaskData, {
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			return response.data;
		} catch (error) {
			console.error("Error creating task in CRM:", error.message);

			throw new HttpException(
				"Failed to create task in CRM",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
