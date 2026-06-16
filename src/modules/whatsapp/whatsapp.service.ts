// src/modules/whatsapp/whatsapp.service.ts

import axios from "axios";

export class WhatsAppService {
  async sendTextMessage(to: string, message: string) {
    try {
      console.log(process.env.WHATSAPP_ACCESS_TOKEN);
      console.log(process.env.WHATSAPP_PHONE_NUMBER_ID);
      const response = await axios.post(
        `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: {
            body: message,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Meta Response:", response.data);

      return response.data;
    } catch (error: any) {
      console.log(JSON.stringify(error.response?.data, null, 2));

      throw error;
    }
  }
}
