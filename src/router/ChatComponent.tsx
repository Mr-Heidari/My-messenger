import { useEffect, useState } from "react";
import ChatPlace from "./HomeComponents.tsx/ChatBox";
export default function ContactListUi(prop: any) {
  const [chats, setChats] = useState([{}]);
  //save contactList by apiCall
  const [contactList, setContactList] = useState([
    {
      name: "",
      username: "",
      date: "",
    },
  ]);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    username: "",
    index: 9.5,
  });
  //save searchedCpntact
  const [filteredList, setFilteredList] = useState(contactList);
  const searchedContact = () => {
    const filtered = contactList.filter((contact) => {
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
  //refresh contactList Each 1000ms
  useEffect(() => {
    const interval = setInterval(getContact, 300);
    return () => {
      clearInterval(interval);
    };
  });
  //refresh searchedList
  useEffect(() => {
    const x = setInterval(searchedContact, 300);
    return () => clearInterval(x);
  });
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
  //refresh contactList Each 1000ms
  useEffect(() => {
    const interval = setInterval(getChats, 300);
    return () => {
      clearInterval(interval);
    };
  });
  if (prop.whichTab === "unread") {
    return (
      <div>
        nice dadash
        <button>kk</button>
      </div>
    );
  } else if (prop.whichTab === "chats") {
    return (
      <>
        <div className="w-full h-screen bg-transparent flex flex-row">
          {/** a container for contactList */}
          <div className="w-2/5 max-lg:w-0 bg-Platinum/10 h-screen order-0 overflow-auto overflow-x-hidden">
            <div className="h-12"></div>
            {contactList.map((contact, index) => (
              <div
                key={contact.date}
                onClick={() =>
                  setContactInfo({
                    name: contact.name,
                    username: contact.username,
                    index: index,
                  })
                }
              >
                <div
                  className={
                    "relative  mt-1 hover:bg-Platinum/20  cursor-pointer"
                  }
                >
                  {/**this button open contactCustimizeTab it lookLike vertical3dot */}
                  <button
                    className={
                      " absolute bg-dotIcone w-7 bg-no-repeat top-0 z-20 h-7 bg-contain bg-right text-left text-sm text-Platinum -right-1 "
                    }
                    onClick={() => {
                      prop.setCustomizeTabVisibility({
                        ...prop.customizeTabVisibility,
                        editTabIndex: index,
                      });
                    }}
                  ></button>
                  {/**we need hide customize tab when click on other contact */}
                  <div
                    onClick={() =>
                      prop.setCustomizeTabVisibility({
                        deleteTabVisibility: " hidden",
                        editTabIndex: 9.5,
                      })
                    }
                    className="absolute  z-10 w-full h-20 transition-opacity opacity-100 "
                  ></div>
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
                  <div className=" bg-transparent rounded-lg flex flex-row w-full h-20">
                    <div className="relative bg-purple2/50 w-16 h-16 order-0 mt-2 rounded-2xl ml-4">
                      <p className="text-Platinum/90 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-2xl m-auto font-semibold">
                        {contact.name[0]}
                      </p>
                    </div>
                    <div className=" bg-transparent w-3/4  h-16 order-1 mt-2 ml-2">
                      <p className="mt-1 text-Platinum font-semibold text-left">
                        {contact.name}
                      </p>
                      <p className=" overflow-hidden text-ellipsis text-nowrap mt-2 text-sm text-Platinum/70">
                        last message : vakhe bia yare inja poole sabtenameto
                        bede
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="order-1 w-full h-screen">
            {contactList.map((contact, index) => (
              <div key={contact.date}>
                <ChatPlace
                  reciver={chats}
                  contactPhoneNumber={contact.username}
                  contactIndex={contactInfo.index}
                  index={index}
                  contactName={contactInfo.name}
                  chatInputHandle={prop.chatInputHandle}
                  chatValue={prop.chatValue}
                  setChatValue={prop.setChatValue}
                ></ChatPlace>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (prop.whichTab === "search") {
    return (
      <>
        <div className="w-full h-screen bg-transparent flex flex-row">
          {/** a container for contactList */}
          <div className="w-2/5 max-lg:w-0 bg-Platinum/10 h-screen order-0 overflow-auto overflow-x-hidden">
            <div className="h-12"></div>
            {filteredList.map((contact, index) => (
              <div
                key={contact.date}
                onClick={() =>
                  setContactInfo({
                    name: contact.name,
                    username: contact.username,
                    index: index,
                  })
                }
              >
                <div
                  className={
                    "relative  mt-1 hover:bg-Platinum/20  cursor-pointer"
                  }
                >
                  {/**this button open contactCustimizeTab it lookLike vertical3dot */}
                  <button
                    className={
                      " absolute bg-dotIcone w-7 bg-no-repeat top-0 z-20 h-7 bg-contain bg-right text-left text-sm text-Platinum -right-1 "
                    }
                    onClick={() => {
                      prop.setCustomizeTabVisibility({
                        ...prop.customizeTabVisibility,
                        editTabIndex: index,
                      });
                    }}
                  ></button>
                  {/**we need hide customize tab when click on other contact */}
                  <div
                    onClick={() =>
                      prop.setCustomizeTabVisibility({
                        deleteTabVisibility: " hidden",
                        editTabIndex: 9.5,
                      })
                    }
                    className="absolute  z-10 w-full h-20 transition-opacity opacity-100 "
                  ></div>
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
                  <div className=" bg-transparent rounded-lg flex flex-row w-full h-20">
                    <div className="relative bg-purple2/50 w-16 h-16 order-0 mt-2 rounded-2xl ml-4">
                      <p className="text-Platinum/90 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-2xl m-auto font-semibold">
                        {contact.name[0]}
                      </p>
                    </div>
                    <div className=" bg-transparent w-3/4  h-16 order-1 mt-2 ml-2">
                      <p className="mt-1 text-Platinum font-semibold text-left">
                        {contact.name}
                      </p>
                      <p className=" overflow-hidden text-ellipsis text-nowrap mt-2 text-sm text-Platinum/70">
                        last message : vakhe bia yare inja poole sabtenameto
                        bede
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="order-1 w-full h-screen">
            {contactList.map((contact, index) => (
              <div key={contact.date}>
                <ChatPlace
                  contactIndex={contactInfo.index}
                  index={index}
                  contactName={contactInfo.name}
                  chatInputHandle={prop.chatInputHandle}
                  chatValue={prop.chatValue}
                ></ChatPlace>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
function ContactCustomizer(prop: any) {
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
    <div
      className={
        "absolute  z-20 w-full h-20 bg-Onyx/70 transition-opacity opacity-100 hover" +
        (prop.editTabIndex === prop.contactIndex ? " " : " hidden")
      }
    >
      <button
        className="absolute top-2 hover:bg-tahiti/90 transition-colors duration-300 rounded-full left-3 bg-no-repeat bg-backArrowIcone bg-contain w-6 h-6 "
        onClick={() => {
          prop.setEditTabIndex({
            ...prop.customizeTabVisibility,
            editTabIndex: 9.5,
          });
        }}
      ></button>
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
        <div className=" w-80 h-32">
          <p className="order-0 right-3 top-6 absolute font-semibold text-tahiti">
            {" "}
            Are You Sure Wanna Delete This Contact?
          </p>
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