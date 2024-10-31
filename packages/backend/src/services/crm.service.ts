// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import axios from 'axios';

// @Injectable()
// export class CrmService {
//   async createUserInCrm(userData: any): Promise<any> {
//     const crmUrl = process.env.CRM_URL;
//     const token = process.env.CRM_TOKEN;

//     try {
//       const response = await axios.post(crmUrl, userData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error creating user in CRM:', error.message);
//       throw new HttpException(
//         'Failed to create user in CRM',
//         HttpStatus.INTERNAL_SERVER_ERROR
//       );
//     }
//   }
// }


// crm.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CrmService {
  async createUserInCrm(userData: any): Promise<any> {
    const crmUrl = process.env.CRM_URLcrmCreateUserUrl;
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
}
