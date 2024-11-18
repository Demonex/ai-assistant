import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CrmService {
  async createUserInCrm(userData: any): Promise<any> {
    const crmUrl = import.meta.env.VITE_CRM_URL;
    const token = import.meta.env.VITE_CRM_TOKEN;


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
      phones: [
        { number: userData.phone, type: 1 }
      ],
      companies: [],
      contacts: [],
      customFieldData: []
    };

    try {
      const response = await axios.post(crmUrl, crmRequestData, {
        headers: {
        'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user in CRM:', error.message);
      throw new HttpException(
        'Failed to create user in CRM',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  async createTaskInCrm(taskData: any): Promise<any> {
    const crmCreateTaskUrl = import.meta.env.CRM_CREATE_TASK_URL;
    const token = import.meta.env.VITE_CRM_TOKEN;


    const crmTaskData = {
      name: taskData.name,
      description: taskData.description || "Process the new user registration",
      project: taskData.project || { id: 7382 },
    };

    try {
      const response = await axios.post(crmCreateTaskUrl, crmTaskData, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task in CRM:', error.message);
      throw new HttpException(
        'Failed to create task in CRM',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
