import { useEffect, useState } from "react";
export default function ChatPlace(prop: any) {
    const [chatInputValue, setChatInputValue] = useState("");
    const chatInputHandle = (event: any) => {
      setChatInputValue(event.target.value);
    };
  const [allchats, setAllChats] = useState([
    {
      date: "",
      id: 9.5,
      receiver: "",
      sender: "",
      text: "",
    },
  ]);
  const [senderChats, setSenderChats] = useState([
    {
      date: "",
      id: 9.5,
      receiver: "",
      sender: "",
      text: "",
    },
  ]);
  const [reciverChats, setReciverChats] = useState([
    {
      date: "",
      id: 9.5,
      receiver: "",
      sender: "",
      text: "",
    },
  ]);
  const reciverMessage = () => {
    const temp = prop.reciver.filter((message: any) => {
      return message.receiver?.includes(localStorage.getItem("username"));
    });
    setReciverChats(temp);
  };
  const allMessage = () => {
    const temp = prop.reciver.filter((message: any) => {
      return message.sender?.includes(localStorage.getItem("username"));
    });
    setSenderChats(temp);
  };
  const chats = () => {
    allMessage();
    reciverMessage();
    setAllChats(reciverChats.concat(senderChats));
    allchats.sort((a, b) => a.id - b.id);
  };
  useEffect(() => {
    const interval = setInterval(chats, 100);
    return () => {
      clearInterval(interval);
    };
  });
  const sendMessage = async () => {
    let message = await (
      await fetch("https://farawin.iran.liara.run/api/chat", {
        method: "POST",
        body: JSON.stringify({
          contactUsername: `${prop.contactPhoneNumber}`,
          textHtml: `${chatInputValue}`,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      })
    ).json();
    console.log(message);
  };
  return (
    <div
      className={
        "w-full right-0 top-0 h-screen relative flex flex-col" +
        (prop.index === prop.contactIndex ? " " : " hidden")
      }
    >
      <div className="w-full h-20 top-1 bg-Platinum/10 order-0">
        <div className="relative ">
          <span className="w-14 h-14 right-8 absolute top-1 pt-3 bg-purple2/50 text-Platinum/90 rounded-full text-center font-semibold text-xl">
            {prop.contactName[0]}
          </span>
          <p className="text-Platinum/90 font-semibold absolute top-4 right-24">
            {prop.contactName}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col h-full mb-2 overflow-auto order-1">
        {allchats.map((x, index) => (
          <div
            key={index}
            className={
              "h-fit p-2 w-full  relative flex " +
              (x.receiver === prop.contactPhoneNumber
                ? " flex-row-reverse "
                : x.sender === prop.contactPhoneNumber
                ? " flex-row  "
                : " hidden")
            }
          >
            <div className="relative  order-0 ">
              <div className="relative   ">
                <p
                  className="text-wrap whitespace-normal max-w-2xl break-words rounded-2xl  text-left w-fit 
                max-md:max-w-xs max-lg:max-w-md max-xl:max-w-lg min-w-20 pr-5 text-Platinum/90 p-4 bg-Platinum/10"
                >
                  {x.sender === prop.contactPhoneNumber ? x.text : " "}
                  {x.receiver === prop.contactPhoneNumber ? x.text : "  "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative order-2 h-16 w-full bg-Onyx z-20">
        <div className="w-full h-16 bg-Platinum/10 absolute bottom-0 ">
          <input
            placeholder="enter message"
            type="text"
            className="w-11/12  absolute pl-5 text-Platinum/90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-Onyx h-10 rounded-xl outline-none border-none pr-16"
            onChange={() => {
              chatInputHandle(event)
            }}
            value={chatInputValue}
          />
          <button
            className="absolute w-8 h-8 bg-sendIcone bg-contain right-16 top-1/2 -translate-y-1/2 "
            onClick={() => {
              if (chatInputValue) {
                sendMessage()
                setChatInputValue("")
              }
            }}
          ></button>
        </div>
      </div>
    </div>
  );
}