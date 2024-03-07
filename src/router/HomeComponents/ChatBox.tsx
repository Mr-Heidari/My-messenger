import { useEffect, useState } from "react";
export default function ChatPlace(prop: any) {
  const [chatInputValue, setChatInputValue] = useState("");
  //a handler for chatInput
  const chatInputHandle = (event: any) => {
    setChatInputValue(event.target.value);
  };
  //when user press edit icone on each mesage this state save some boolean we use this state for some ui control
  const [editButtonShow, setEditButtonShow] = useState(false);
  //this state set id an text we use this state for api calls
  const [messageControl, setMessageControl] = useState({
    id: 0,
    text: "",
  });
  ////this state save allChatsApiResponse
  const [allchats, setAllChats] = useState([
    {
      date: "",
      id: 9.5,
      receiver: "",
      sender: "",
      text: "",
    },
  ]);
  //this state save allSender match with userLogedin phoneNumber
  const [senderChats, setSenderChats] = useState([
    {
      date: "",
      id: 9.5,
      receiver: "",
      sender: "",
      text: "",
    },
  ]);
  //this state save allreciver match with userLogedin phoneNumber
  const [reciverChats, setReciverChats] = useState([
    {
      date: "",
      id: 9.5,
      receiver: "",
      sender: "",
      text: "",
    },
  ]);
  //a fucntion for filter all chats by reciver with user phoneNumber
  const reciverMessage = () => {
    const temp = prop.chats.filter((message: any) => {
      return message.receiver?.includes(localStorage.getItem("username"));
    });
    setReciverChats(temp);
  };
  //a fucntion for filter all chats by sender with user phoneNumber
  const senderMessage = () => {
    const temp = prop.chats.filter((message: any) => {
      return message.sender?.includes(localStorage.getItem("username"));
    });
    setSenderChats(temp);
  };
  //all chats send or recive  will contact to each other and sort by id
  const chats = () => {
    senderMessage();
    reciverMessage();
    setAllChats(reciverChats.concat(senderChats));
    allchats.sort((a, b) => a.id - b.id);
  };
  useEffect(() => {
    const interval = setInterval(chats, 300);
    return () => {
      clearInterval(interval);
    };
  });
  //api call for send message to server
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
    <>
      {/** a container this container will be hide when user press back arrow button for responsive design */}
      <div
        className={
          "w-full right-0 top-0 h-screen relative flex flex-col shadow-lg" +
          (prop.index === prop.contactIndex ? " " : " hidden")
        }
      >
        {/**top bar */}
        <div className="w-full h-20 top-1 bg-Platinum/10 order-0">
          <div className="relative ">
            {/**contact Logo name  */}
            <span className="w-14 h-14 right-8 absolute top-1 pt-3 bg-purple2/50 text-Platinum/90 rounded-full text-center font-semibold text-xl">
              {prop.contactName[0]}
            </span>
            {/**contact  name  */}
            <p className="text-Platinum/90 font-semibold absolute top-5 right-24">
              {prop.contactName}
            </p>
          </div>
        </div>
        {/** a container for all messages */}
        <div className="w-full flex flex-col h-full mb-2 overflow-auto order-1">
          {allchats.map((x, index) => (
            //this div dir will change if message sended or recived
            <div
              key={index}
              className={
                "h-fit p-2 w-full  relative flex  " +
                (x.receiver === prop.contactPhoneNumber
                  ? " flex-row-reverse pr-5"
                  : x.sender === prop.contactPhoneNumber
                  ? " flex-row pl-5 "
                  : " hidden")
              }
            >
              <div className="relative  order-0 ">
                <div className="relative   ">
                  {/** delete message when this button clicked */}
                  <button
                    className=" absolute left-1 top-1 bg-deleteIcone opacity-80 bg-no-repeat w-5 h-5 bg-contain"
                    onClick={async () => {
                      const sendMessage = async () => {
                        await (
                          await fetch(
                            "https://farawin.iran.liara.run/api/chat",
                            {
                              method: "DELETE",
                              body: JSON.stringify({
                                id: x.id,
                              }),
                              headers: {
                                "Content-Type": "application/json",
                                authorization: `${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          )
                        ).json();
                      };
                      sendMessage();
                    }}
                  ></button>
                  {/** if eidt icone clided on top of chatInput user see a that message want to Edit and show user like popUp */}
                  <button
                    className=" absolute right-1 bottom-1 bg-editIcone opacity-80 bg-no-repeat w-4 h-4 bg-contain"
                    onClick={() => {
                      setChatInputValue(x.text);
                      setMessageControl({
                        text: x.text,
                        id: x.id,
                      });
                      setEditButtonShow(true);
                    }}
                  ></button>
                  {/** message time */}
                  <span className="text-Platinum/60 absolute text-sm ml-3 bottom-0 font-semibold">
                    {x.date.slice(11, 16)}
                  </span>
                  {/** message */}
                  <p
                    className={
                      "text-wrap whitespace-normal max-w-2xl break-words  text-left w-fit max-md:max-w-xs max-lg:max-w-md max-xl:max-w-lg min-w-20 pr-4 text-Platinum/90 pb-6 py-4 p-3 px-10 shadow-xl  bg-Platinum/10 " +
                      (x.receiver === prop.contactPhoneNumber
                        ? " rounded-t-xl rounded-bl-xl "
                        : x.sender === prop.contactPhoneNumber
                        ? " rounded-b-xl rounded-tr-xl  "
                        : " ")
                    }
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
          <div
            className={
              "w-full h-12 bg-dimGray z-20 absolute bottom-14" +
              (editButtonShow ? " " : " hidden")
            }
          >
            {/** this button  is like back */}
            <button
              className="text-Platinum absolute right-4 top-3 font-semibold bg-backArrowIcone bg-contain w-6 h-6 hover:bg-Platinum/10 rounded-full p-2"
              onClick={() => {
                setEditButtonShow(false);
                setChatInputValue("");
              }}
            ></button>
            {/** message text user want to edit */}
            <p className="text-Platinum/60 w-11/12  ml-5 mt-3 overflow-hidden text-ellipsis text-nowrap">
              {messageControl.text}
            </p>
          </div>
          <div className="w-full h-16 bg-Platinum/10 absolute bottom-0 ">
            {/** cha input */}
            <input
              placeholder="enter message"
              type="text"
              className="w-11/12  absolute pl-5 text-Platinum/90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-Onyx h-10 rounded-xl outline-none border-none pr-16"
              onChange={() => {
                chatInputHandle(event);
              }}
              value={chatInputValue}
              onKeyDown={async (event) => {
                if (
                  event.key === "Enter" &&
                  !editButtonShow &&
                  chatInputValue
                ) {
                  sendMessage();
                  setChatInputValue("");
                } else if (
                  event.key === "Enter" &&
                  editButtonShow &&
                  chatInputValue
                ) {
                  const EditMessage = async () => {
                    await (
                      await fetch("https://farawin.iran.liara.run/api/chat", {
                        method: "PUT",
                        body: JSON.stringify({
                          id: messageControl.id,
                          textHtml: `${chatInputValue}`,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                          authorization: `${localStorage.getItem("token")}`,
                        },
                      })
                    ).json();
                  };
                  EditMessage();
                  setEditButtonShow(false);
                  setChatInputValue("");
                }
              }}
            />
            {/** send button  */}
            <button
              className={
                "absolute w-8 h-8 bg-sendIcone bg-contain right-16 top-1/2 -translate-y-1/2 " +
                (!editButtonShow ? " " : " hidden")
              }
              onClick={() => {
                if (chatInputValue) {
                  sendMessage();
                  setChatInputValue("");
                }
              }}
            ></button>
            {/** edit button when click selected message will edited */}
            <button
              className={
                "text-Platinum absolute w-8 h-8  right-16 top-1/2 -translate-y-1/2 " +
                (editButtonShow ? " " : " hidden")
              }
              onClick={async () => {
                const EditMessage = async () => {
                  await (
                    await fetch("https://farawin.iran.liara.run/api/chat", {
                      method: "PUT",
                      body: JSON.stringify({
                        id: messageControl.id,
                        textHtml: `${chatInputValue}`,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("token")}`,
                      },
                    })
                  ).json();
                };
                EditMessage();
                setEditButtonShow(false);
                setChatInputValue("");
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
