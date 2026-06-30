import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {
  async sendAlert(alert: {
    title: string;
    city: string;
    severity: string;
    description: string;
  }) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text = `
🚨 Weather Alert

📍 City: ${alert.city}

⚠️ Severity: ${alert.severity}

📝 Title:
${alert.title}

📄 Description:
${alert.description}
`;

    await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        chat_id: chatId,
        text,
      },
    );
  }
}