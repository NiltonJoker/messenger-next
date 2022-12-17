import { Message } from "../typings";

const uploadMessageToUpstash = async (
  messages: Message[] | undefined,
  message: Message
) => {
  const data = await fetch("/api/addMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  }).then((res) => res.json());

  return [data.message, ...messages!];
};

export default uploadMessageToUpstash;
