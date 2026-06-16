// src/modules/whatsapp/whatsapp.service.ts

import axios from "axios";

export class WhatsAppService {
  async sendTextMessage(
    to: string,
    message: string,
  ) {
    return axios.post(
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
  }
}