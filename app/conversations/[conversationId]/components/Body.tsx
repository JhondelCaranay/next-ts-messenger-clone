"use client";

import { FullMessageType } from "@/app/types";

type Props = {
  initialMessages: FullMessageType[];
};
const Body = ({ initialMessages = [] }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto">
      BODY
      {/* {messages.map((message, i) => (
      <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
    ))} */}
      {/* <div className="pt-24" ref={bottomRef} /> */}
    </div>
  );
};
export default Body;
