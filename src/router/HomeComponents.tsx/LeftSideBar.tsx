import Menu from "./Menu";
export default function SideBar(prop: any) {
    return (
      //container all buttons
      <div className="flex flex-col w-20 h-full ">
        {/**menu btn */}
        <Menu showMenu={prop.showMenu} hideMenu={prop.menuVisibility}></Menu>
        <div className="w-20 h-fit order-0">
          <button
            className={"w-20 h-20 pt-6 text-xs bg-menuIcone text-Platinum text-center bg-auto bg-origin-padding bg-[center_top_0.7rem] bg-no-repeat hover:bg-Platinum/20 focus:bg-Platinum/10 mx-auto"+(prop.chatListShow ? " max-lg:w-16  " : " max-lg:hidden")}
            onClick={() => {
              prop.menuVisibility()
              prop.setCustomizeTabVisibility({
                editTabIndex: 9.5,
                deleteTabVisibility: " hidden",
              });
            }}
          >
            menu
          </button>
        </div>
        {/**unread tab */}
        <div className="w-20 h-fit order-1">
          <button
            className={
              "w-20 h-20 pt-6 text-xs bg-unreadIcone text-Platinum text-center bg-auto bg-origin-padding bg-[center_top_0.7rem] bg-no-repeat hover:bg-Platinum/20 focus:bg-Platinum/10 mx-auto" +
              (prop.selectedTab === "unread"
                ? " bg-Platinum/10"
                : prop.selectedTab === "menu"
                ? "  bg-Platinum/10"
                : "") +(prop.chatListShow ? " max-lg:w-16  " : " max-lg:hidden")
            }
            onClick={() => {
              prop.setSelectedTab("unread");
              prop.setCustomizeTabVisibility({
                editTabIndex: 9.5,
                deleteTabVisibility: " hidden",
              });
            }}
          >
            unread
          </button>
        </div>
        {/**chats tab */}
        <div className="w-20 h-fit order-2">
          <button
            className={
              "w-20 h-20 pt-6 text-xs bg-chatIcone text-Platinum text-center bg-auto bg-origin-padding bg-[center_top_0.7rem] bg-no-repeat hover:bg-Platinum/20  mx-auto" +
              (prop.selectedTab === "chats"
                ? " bg-Platinum/10"
                : prop.selectedTab === "menu"
                ? "  bg-Platinum/10"
                : "")+(prop.chatListShow ? " max-lg:w-16  " : " max-lg:hidden")
            }
            onClick={() => {
              prop.setSelectedTab("chats");
              prop.setCustomizeTabVisibility({
                editTabIndex: 9.5,
                deleteTabVisibility: " hidden",
              });
            }}
          >
            chats
          </button>
        </div>
        {/**addContactForm */}
        <div className="w-20 h-fit order-3">
          <button
            className={"w-20 h-20 pt-6 text-xs bg-addContactIcone text-Platinum text-center bg-auto bg-origin-padding bg-[center_top_0.7rem] bg-no-repeat hover:bg-Platinum/20 focus:bg-Platinum/10 mx-auto"+(prop.chatListShow ? " max-lg:w-16  " : " max-lg:hidden")}
            onClick={() => {
              prop.setCustomizeTabVisibility({
                editTabIndex: 9.5,
                deleteTabVisibility: " hidden",
              });
              prop.showAddForm();
            }}
          >
            addContact
          </button>
        </div>
      </div>
    );
  }