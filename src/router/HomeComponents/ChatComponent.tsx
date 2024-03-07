import { useEffect, useState } from "react";
import ChatPlace from "./ChatBox";
export default function ContactListUi(prop: any) {
  //this state save each chatBox last message
  const [lastMessage, setLastMessage] = useState([
    {
      date: "",
      id: 9.5,
      text: "",
      receiver: "",
      sender: "",
    },
  ]);
  //this state will save each index of last message
  const [lastMessageIndex] = useState([1]);
  //this state save allChatsApiResponse
  const [chats, setChats] = useState([
    {
      date: "",
      id: 9.5,
      sender: "",
      receiver: "",
      text: "",
    },
  ]);
  //save allContactList by apiCall
  let [contactList, setContactList] = useState([
    {
      name: "",
      username: "",
      date: "",
      ref: "",
    },
  ]);
  //this state will be get each user contact list
  const [userContacts, setUserContacts] = useState(contactList);
  //this state send some prop to child  and control some ui in this comp or even in her child
  const [contactInfo, setContactInfo] = useState({
    name: "",
    username: "",
    index: 9.5,
  });
  //save searchedContact
  const [filteredList, setFilteredList] = useState(userContacts);
  //a function for get all chats and filterd by each username logined that mean get all user chat send or recieve
  const setAllChats = () => {
    const temp = chats.filter((message: any) => {
      return message.receiver?.includes(localStorage.getItem("username"));
    });
    const temp2 = chats.filter((message: any) => {
      return message.sender?.includes(localStorage.getItem("username"));
    });
    const temp3 = temp2.concat(temp);
    setLastMessage(temp3.sort((a, b) => a.id - b.id));
  };
  //get index of last message of each chatBox
  const getLastMessage = () => {
    for (let i = 0; i < userContacts.length; i++) {
      let receiver = lastMessage
        .map((x) => {
          return x.receiver;
        })
        .lastIndexOf(userContacts[i].username);
      let sender = lastMessage
        .map((x) => {
          return x.sender;
        })
        .lastIndexOf(userContacts[i].username);
      if (receiver > sender) {
        lastMessageIndex[i] = receiver;
      } else {
        lastMessageIndex[i] = sender;
      }
    }
  };
  //this is a function when user search contact we filter userContactsState by searchInputValue
  const searchedContact = () => {
    const filtered = userContacts.filter((contact) => {
      return contact.name.match(prop.searchValue);
    });
    setFilteredList(filtered);
  };
  //call api and get contact
  const getContact = async () => {
    let contacts = await (
      await fetch("https://farawin.iran.liara.run/api/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      })
    ).json();
    setContactList(contacts.contactList);
  };
  //call api and get allChats
  const getChats = async () => {
    let chats = await (
      await fetch("https://farawin.iran.liara.run/api/chat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      })
    ).json();
    setChats(chats.chatList);
  };
  const allFunctionContainer = () => {
    getContact();
    searchedContact();
    setUserContacts(
      contactList.filter((userContacts) => {
        return userContacts.ref === localStorage.getItem("username");
      })
    );
    getLastMessage();
    getChats();
    setAllChats();
  };
  //refresh contactList Each 500ms
  useEffect(() => {
    const interval = setInterval(allFunctionContainer, 500);
    return () => {
      clearInterval(interval);
    };
  });
  //if api get unread Message this tab work but now is empty
  if (prop.whichTab === "unread") {
    return (
      <div className="text-Platinum w-72 top-1/2 absolute">
        if api get unreadMessagethis will work
      </div>
    );
  } else if (prop.whichTab === "chats") {
    return (
      <>
        <div className="w-full  h-screen bg-transparent flex flex-row">
          {/** a container for contactList */}
          <div
            className={
              "w-2/5 bg-Platinum/10 min-w-80 h-screen  order-0 overflow-auto overflow-x-hidden max-w-md " +
              (prop.chatListShow ? " max-lg:w-80" : " max-lg:hidden")
            }
          >
            <div className="h-12 "></div>
            {userContacts.length !== 0 ? (
              userContacts.map((contact, index) => (
                <div key={contact.date}>
                  <div className="relative">
                    {/** this button when press you can see customize Tab */}
                    <button
                      className={
                        " absolute bg-dotIcone w-7 bg-no-repeat top-0  z-20 h-7 bg-contain bg-right text-left text-sm text-Platinum -right-1 "
                      }
                      onClick={() => {
                        prop.setCustomizeTabVisibility({
                          ...prop.customizeTabVisibility,
                          editTabIndex: index,
                        });
                      }}
                    ></button>
                    {/**ContactCustomizer comp guide:
                     * editFormControl :will hidden or show some form or tab or div and control ui ....
                     * username: this prop send current username for call api`s
                     * name :this prop send current name for editFormControl
                     * editTabIndex: this prop is for control hide or show customizeTabVisibility
                     * customizeTabVisibility: pass some value for controlui
                     *  setEditTabIndex : user can control show and hide customizeTabVisibility inside comp
                     * deleteTabVisibility: for delete tab or div show and hide
                     * contactIndex: if user click on other element customizeTab will hide
                     */}
                    <ContactCustomizer
                      editFormControl={prop.editFormControl}
                      username={contact.username}
                      name={contact.name}
                      editTabIndex={prop.editTabIndex}
                      customizeTabVisibility={prop.customizeTabVisibility}
                      setEditTabIndex={prop.setCustomizeTabVisibility}
                      deleteTabVisibility={prop.deleteTabVisibility}
                      contactIndex={index}
                    ></ContactCustomizer>
                  </div>
                  {/** if click some ui will change */}
                  <div
                    onClick={() => {
                      setContactInfo({
                        name: contact.name,
                        username: contact.username,
                        index: index,
                      });
                      prop.setChatListShow(false);
                    }}
                  >
                    <div
                      className={
                        "relative  mt-1  hover:bg-Platinum/20   cursor-pointer" +
                        (contactInfo.index === index
                          ? " bg-purple2/25 hover:bg-purple2/25"
                          : " ")
                      }
                    >
                      {/**we need hide customize tab when click on other contact */}
                      <div
                        onClick={() =>
                          prop.setCustomizeTabVisibility({
                            deleteTabVisibility: " hidden",
                            editTabIndex: 9.5,
                          })
                        }
                        className="absolute   z-10 w-full h-20 transition-opacity opacity-100 "
                      ></div>
                      {/** status for each contact like time last message ..... */}
                      <div className=" bg-transparent rounded-lg flex flex-row w-full h-20">
                        <div className="relative  bg-purple2/50 w-16 h-16 order-0 mt-2 rounded-2xl ml-4">
                          <p className="text-Platinum/90 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-2xl m-auto font-semibold">
                            {contact.name[0]}
                          </p>
                        </div>
                        <div className=" bg-transparent w-3/4   h-16 order-1 mt-2 ml-2">
                          <p className="mt-1 text-Platinum font-semibold text-left">
                            {contact.name}
                          </p>
                          <p className=" overflow-hidden text-ellipsis text-nowrap mt-2 text-sm text-Platinum/70">
                            {lastMessage[lastMessageIndex[index]]?.text}
                          </p>
                          <p className="absolute top-4  right-6 overflow-hidden text-ellipsis text-nowrap  text-sm text-Platinum/70">
                            {lastMessage[lastMessageIndex[index]]?.date.slice(
                              11,
                              16
                            )}
                          </p>
                          <p className="absolute top-4  right-16 overflow-hidden text-ellipsis text-nowrap  text-[10px] text-Platinum/50">
                            {lastMessage[lastMessageIndex[index]]?.date.slice(
                              0,
                              10
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              //if user dont have any contact will show
              <p className="text-Platinum fixed top-1/2 left-1/3 font-semibold max-lg:max-w-96 max-lg:left-24 translate-x-1/2 bg-gold-metalic/30 p-3 rounded-md  -translate-y-1/2 animate-bounce ">
                seems you dont have any contact press addContact Menu from
                leftSide and add your friends
              </p>
            )}
          </div>
          {/** this button is for responsive design this work for phone client */}
          <button
            className={
              "absolute z-30 lg:hidden opacity-100 w-10 h-10 bg-backArrowIcone  bg-contain left-10 top-3" +
              (!prop.chatListShow ? " " : " hidden")
            }
            onClick={() => {
              prop.setChatListShow(true);
              setContactInfo({
                ...contactInfo,
                index: 9.5,
              });
              console.log(prop.chatListShow);
            }}
          ></button>
          <div
            className={
              "order-1 w-full  h-screen" +
              (!prop.chatListShow ? " " : " hidden")
            }
          >
            {/**
             * render chatBox for each contact
             */}
            {userContacts.map((contact, index) => (
              <div key={contact.date}>
                {/**ChatPlace comp guide:
                 * chats: send all chats
                 * contactPhoneNumber: send current username
                 * contactIndex: on top told you why this maded
                 * index: for comparing with contactInfo.index and control some ui
                 * contactName: pass to child for some paragraph value
                 */}
                <ChatPlace
                  chats={chats}
                  contactPhoneNumber={contact.username}
                  contactIndex={contactInfo.index}
                  index={index}
                  contactName={contactInfo.name}
                ></ChatPlace>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (prop.whichTab === "search") {
    //search tab element`s are like  chat tab but render filtered list (agar zaman bood badan ino ye comp mikonam ke code tekrari nazanam )
    return (
      <>
        <div className="w-full  h-screen bg-transparent flex flex-row">
          {/** a container for contactList */}
          <div
            className={
              "w-2/5 bg-Platinum/10 min-w-80 h-screen  order-0 overflow-auto overflow-x-hidden max-w-md " +
              (prop.chatListShow ? " max-lg:w-80" : " max-lg:hidden")
            }
          >
            <div className="h-12 "></div>
            {userContacts.length !== 0 ? (
              filteredList.map((contact, index) => (
                <div key={contact.date}>
                  <div className="relative">
                    <button
                      className={
                        " absolute bg-dotIcone w-7 bg-no-repeat top-0  z-20 h-7 bg-contain bg-right text-left text-sm text-Platinum -right-1 "
                      }
                      onClick={() => {
                        prop.setCustomizeTabVisibility({
                          ...prop.customizeTabVisibility,
                          editTabIndex: index,
                        });
                      }}
                    ></button>
                    <ContactCustomizer
                      editFormControl={prop.editFormControl}
                      username={contact.username}
                      name={contact.name}
                      editTabIndex={prop.editTabIndex}
                      customizeTabVisibility={prop.customizeTabVisibility}
                      setEditTabIndex={prop.setCustomizeTabVisibility}
                      deleteTabVisibility={prop.deleteTabVisibility}
                      contactIndex={index}
                    ></ContactCustomizer>
                  </div>
                  <div
                    onClick={() => {
                      setContactInfo({
                        name: contact.name,
                        username: contact.username,
                        index: index,
                      });
                      prop.setChatListShow(false);
                    }}
                  >
                    <div
                      className={
                        "relative  mt-1  hover:bg-Platinum/20   cursor-pointer" +
                        (contactInfo.index === index
                          ? " bg-purple2/25 hover:bg-purple2/25"
                          : " ")
                      }
                    >
                      {/**we need hide customize tab when click on other contact */}
                      <div
                        onClick={() =>
                          prop.setCustomizeTabVisibility({
                            deleteTabVisibility: " hidden",
                            editTabIndex: 9.5,
                          })
                        }
                        className="absolute   z-10 w-full h-20 transition-opacity opacity-100 "
                      ></div>

                      <div className=" bg-transparent rounded-lg flex flex-row w-full h-20">
                        <div className="relative  bg-purple2/50 w-16 h-16 order-0 mt-2 rounded-2xl ml-4">
                          <p className="text-Platinum/90 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-2xl m-auto font-semibold">
                            {contact.name[0]}
                          </p>
                        </div>
                        <div className=" bg-transparent w-3/4   h-16 order-1 mt-2 ml-2">
                          <p className="mt-1 text-Platinum font-semibold text-left">
                            {contact.name}
                          </p>
                          <p className=" overflow-hidden text-ellipsis text-nowrap mt-2 text-sm text-Platinum/70">
                            {lastMessage[lastMessageIndex[index]]?.text}
                          </p>
                          <p className="absolute top-4  right-6 overflow-hidden text-ellipsis text-nowrap  text-sm text-Platinum/70">
                            {lastMessage[lastMessageIndex[index]]?.date.slice(
                              11,
                              16
                            )}
                          </p>
                          <p className="absolute top-4  right-16 overflow-hidden text-ellipsis text-nowrap  text-[10px] text-Platinum/50">
                            {lastMessage[lastMessageIndex[index]]?.date.slice(
                              0,
                              10
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-Platinum fixed top-1/2 left-1/3 font-semibold max-lg:max-w-96 max-lg:left-24 translate-x-1/2 bg-gold-metalic/30 p-3 rounded-md  -translate-y-1/2 animate-bounce ">
                seems you dont have any contact press addContact Menu from
                leftSide and add your friends
              </p>
            )}
          </div>
          <button
            className={
              "absolute z-30 lg:hidden opacity-100 w-10 h-10 bg-backArrowIcone  bg-contain left-10 top-3" +
              (!prop.chatListShow ? " " : " hidden")
            }
            onClick={() => {
              prop.setChatListShow(true);
              setContactInfo({
                ...contactInfo,
                index: 9.5,
              });
              console.log(prop.chatListShow);
            }}
          ></button>
          <div
            className={
              "order-1 w-full  h-screen" +
              (!prop.chatListShow ? " " : " hidden")
            }
          >
            {userContacts.map((contact, index) => (
              <div key={contact.date}>
                <ChatPlace
                  reciver={chats}
                  contactPhoneNumber={contact.username}
                  contactIndex={contactInfo.index}
                  index={index}
                  contactName={contactInfo.name}
                ></ChatPlace>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
//a customizer tab for each contact  if user press 3doticone will show
function ContactCustomizer(prop: any) {
  //delete contact api
  const deletContact = async () => {
    let response = await (
      await fetch("https://farawin.iran.liara.run/api/contact", {
        method: "DELETE",
        body: JSON.stringify({
          username: `${prop.username}`,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      })
    ).json();
    console.log(response);
  };
  return (
    //a container
    <div
      className={
        "absolute  z-20 w-full h-20 bg-Onyx/70 transition-opacity opacity-100 hover" +
        (prop.editTabIndex === prop.contactIndex ? " " : " hidden")
      }
    >
      {" "}
      {/**
       * this bottn when press will hide customizetab this work like back
       */}
      <button
        className="absolute top-2 hover:bg-tahiti/90 transition-colors duration-300 rounded-full left-3 bg-no-repeat bg-backArrowIcone bg-contain w-6 h-6 "
        onClick={() => {
          prop.setEditTabIndex({
            ...prop.customizeTabVisibility,
            editTabIndex: 9.5,
          });
        }}
      ></button>
      {/** Edit button when press edit form will pop up and show  */}
      <button
        onClick={() => {
          prop.editFormControl({
            phoneNumber: prop.username,
            name: prop.name,
            formVisibility: " ",
          });
        }}
        className="w-16 text-sm h-10 text-left bg-contain bg-editIcone bg-no-repeat  bg-right text-Platinum right-1/4 mt-5 absolute  hover:bg-tahiti/90 transition-colors duration-300 rounded-lg"
      >
        Edit
      </button>
      {/** this button when pressed show delete tab  */}
      <button
        className="w-20 text-sm h-10 text-left bg-contain bg-deleteIcone bg-no-repeat  bg-right text-Platinum left-1/4 mt-5 absolute  hover:bg-tahiti/90 transition-colors duration-300 rounded-lg"
        onClick={() => {
          prop.setEditTabIndex({
            ...prop.customizeTabVisibility,
            deleteTabVisibility: " ",
          });
        }}
      >
        Delete
      </button>
      <div
        className={
          "w-full h-20 bg-Onyx/80 backdrop-blur-sm cursor-auto" +
          prop.deleteTabVisibility
        }
      >
        {/** this tab will appears when user press delete button */}
        <div className=" w-80 h-32">
          <p className="order-0 right-3 top-6 text-ellipsis overflow-hidden absolute font-semibold text-tahiti">
            Are You Sure Wanna Delete This Contact?
          </p>
          {/** yes button delete contact from list */}
          <button
            className="absolute top-2 left-2 hover:bg-tahiti/90 transition-colors duration-300  border-none rounded-lg w-12 text-Platinum/90"
            onClick={() => {
              prop.setEditTabIndex({
                editTabIndex: 9.5,
                deleteTabVisibility: " hidden",
              });
              deletContact();
            }}
          >
            Yes
          </button>
          {/** no button back to before tab */}
          <button
            className="absolute bottom-2 left-2 w-12 hover:bg-tahiti/90 transition-colors duration-300 rounded-lg border-none text-Platinum/90 "
            onClick={() => {
              prop.setEditTabIndex({
                editTabIndex: prop.contactIndex,
                deleteTabVisibility: " hidden",
              });
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
