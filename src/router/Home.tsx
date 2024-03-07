import {  useState } from "react";
import EditForm from "./HomeComponents/editForm.tsx";
import ContactListUi from "./HomeComponents/ChatComponent.tsx";
import AddContactForm from "./HomeComponents/AddContactForm.tsx";
import SideBar from "./HomeComponents/LeftSideBar.tsx";
export default function MessengerHomePage() {
  const [chatListShow, setChatListShow] = useState(true);
  //we have addContactForm so we need control him like pop up
  const [addContactVisiblity, setAddContactVisiblity] = useState(" hidden");
  //we have 3 tab chats, unread, and search for each tab we should render some contact
  const [selectedTab, setSelectedTab] = useState("chats");
  //menu visibility Control
  const [menuShow, setMenuShow] = useState(false);
  //this is a function for sending to child element by props and control some ui
  const [editFormControl, setEditFormControl] = useState({
    phoneNumber: "",
    name: "",
    formVisibility: " hidden",
  });
  //this state work when userclient press 3 dot button and show contactCustomizerTab
  const [customizeTabVisibility, setCustomizeTabVisibility] = useState({
    editTabIndex: 9.5,
    deleteTabVisibility: " hidden",
  });
  //save search Input
  const [searchInputValue, setSearchInputValue] = useState("");
  //handle searchInputValue
  const searchInputhandle = (event: any) => {
    setSearchInputValue(event.target.value);
  };
  const menuVisibility = () => {
    if (menuShow === true) setMenuShow(false);
    else {
      setMenuShow(true);
    }
  };
  //this is a function for sending to child element by props
  const changeFormVisibility = () => {
    if (addContactVisiblity === " ") {
      setAddContactVisiblity(" hidden");
    } else {
      setAddContactVisiblity(" ");
    }
  };
  return (
    <>
      <div className="bg-Onyx w-full h-screen ">
        {/**EditForm prop guide:
         * phoneNumber: send contact phoneNumber to this comp phoneNumber set from ContactUiList Comp
         * formShow:for show and hide EditForm this prop will controled outSide of thisComponent (ContactListUi)
         * formControl:get some values
         * formVisibilityControl: set Visibility of thisComp inside him
         */}
        <EditForm
          phoneNumber={editFormControl.phoneNumber}
          formShow={editFormControl.formVisibility}
          formControl={editFormControl}
          formVisibilityControl={setEditFormControl}
        ></EditForm>
        <div className=" flex flex-row w-full h-full ">
          {/**sidebar for user typess**/}
          <div
            className={
              "w-20  bg-Onyx h-full order-0" +
              (chatListShow ? " max-lg:w-16" : " max-lg:hidden")
            }
          >
            {/**SideBar Comp guide:
             * showAddForm:this prop is function for contorl visibility of addContactForm by addContactBtn
             * customizeTabVisibility:this prop is about customize each contact
             * setCustomizeTabVisibility:this prop send function this function set befor prop
             * menuVisibility: this prop send function this function set visibility of menu
             * showMenu: we need this for control menuVisibility
             * selectedTab: we have some tabs like search or chats or .... this prop save tab
             * setSelectedTab: set before prop
             */}
            <SideBar
              showAddForm={changeFormVisibility}
              customizeTabVisibility={customizeTabVisibility}
              setCustomizeTabVisibility={setCustomizeTabVisibility}
              menuVisibility={menuVisibility}
              showMenu={menuShow}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              chatListShow={chatListShow}
            ></SideBar>
          </div>
          {/**message side*/}
          <div className="order-1 w-full  overflow-hidden">
            {/** search */}
            <div className={"relative box-border bg-Onyx  z-30 "}>
              <div
                className={"left-2 bg-Platinum/10 box-border w-full relative "}
              >
                <input
                  type="text"
                  className={
                    "w-[38%] h-10 absolute max-w-[430px]  mt-2 bg-Onyx rounded-2xl  outline-none border-none text-Platinum pl-5" +
                    (chatListShow
                      ? " max-lg:w-80 max-[376px]:w-[270px] max-lg:max-w-[300px] "
                      : " lg:w-[28%] min-w-[300px]  max-lg:hidden")
                  }
                  placeholder="Search"
                  onFocus={() => {
                    setSelectedTab("search");
                  }}
                  onChange={searchInputhandle}
                  value={searchInputValue}
                />
              </div>
            </div>
            <div className="w-full  border-none  h-screen ">
              {/**ContactListUi Comp guide:
               *searchValue: send searchInputValue
               *whichTab: we have 3 tab this prop send ourCurrent tab for render diffrent html
               *editFormControl : this prop is function setSomeValue for EditForm this value will set inside ContactListUi childs
               *customizeTabVisibility: this prop is about customize each contact
               *setCustomizeTabVisibility:this prop send function this function set befor prop
               *editTabIndex:this is a property of customizeTabVisibility actually we send this index for show and  hide customize tab for each contact Individually
               *deleteTabVisibility: inside of customizetab we have delete button when userpress show another tab so this will help  us to control hide and show this tab
               */}
              <ContactListUi
                searchValue={searchInputValue}
                whichTab={selectedTab}
                editFormControl={setEditFormControl}
                customizeTabVisibility={customizeTabVisibility}
                setCustomizeTabVisibility={setCustomizeTabVisibility}
                editTabIndex={customizeTabVisibility.editTabIndex}
                deleteTabVisibility={customizeTabVisibility.deleteTabVisibility}
                chatListShow={chatListShow}
                setChatListShow={setChatListShow}
              ></ContactListUi>
            </div>
          </div>
          {/**AddContactForm Comp guide:
           * uiControl: this is a function inside function setAddContactVisiblity
           * showForm: send value of addContactVisiblity
           */}
          <AddContactForm
            uiControl={changeFormVisibility}
            showForm={addContactVisiblity}
          ></AddContactForm>
        </div>
      </div>
    </>
  );
}
