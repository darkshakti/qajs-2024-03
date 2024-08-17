import { config } from '../config'

const sendMessage = async message => {
  if (!config.telegram.enable) {
    return
  }

  if (!config.telegram.token || !config.telegram.chatId) {
    console.warn(
      'Для отправки сообщений в телеграм нужно задать токен и ID чата',
    )
    return
  }

  return await fetch(
    `https://api.telegram.org/bot${config.telegram.token}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: config.telegram.chatId,
        text: message,
      }),
    },
  )
}

export default {
  sendMessage,
}
