"use client";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { Message } from "../typings";
import MessageComponent from "./MessageComponent";
import { useEffect } from "react";
import { clientPusher } from "../pusher";
function MessageList() {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      if (messages?.some((message) => message.id === data.id)) return;

      if (!messages) return mutate(fetcher);

      mutate(fetcher, {
        optimisticData: [data, ...messages!],
        rollbackOnError: true,
      });
    });
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;