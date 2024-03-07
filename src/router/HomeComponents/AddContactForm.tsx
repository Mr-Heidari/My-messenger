import { useState } from "react";
import Input from "../InputComp";
export default function AddContactForm(prop: any) {
  //a state for control a uiResponse when user click on add button
  const [apiLoaderAnimate, setApiLoaderAnimate] = useState(" hidden");
  //we should upDate our inputs value by state
  const [addContactFormInputsValue, setAddContactFormInputsValue] = useState({
    phoneNumber: "",
    name: "",
  });
  //get and set api message
  const [apiResponseMessage, setApiResponseMessage] = useState("");
  //handle phoneInput just get number
  const phoneInputHandle = (event: any) => {
    if (/\d$/.test(event.target.value)) {
      setAddContactFormInputsValue({
        ...addContactFormInputsValue,
        phoneNumber: event.target.value,
      });
    } else if (!event.target.value) {
      setAddContactFormInputsValue({
        ...addContactFormInputsValue,
        phoneNumber: "",
      });
    }
  };
  //handle nameInput
  const nameInputHandle = (event: any) => {
    setAddContactFormInputsValue({
      ...addContactFormInputsValue,
      name: event.target.value,
    });
  };
  //this function control visibility div this div show user response when user press add button
  const apiResponseLoader = () => {
    if (apiResponseMessage === "ok") {
      setApiLoaderAnimate(" opacity-100");
      setTimeout(() => {
        setApiLoaderAnimate(" opacity-0");
      }, 800);
      setTimeout(() => {
        setApiLoaderAnimate(" hidden");
      }, 900);
    } else if (apiResponseMessage === "conflict") {
      setApiLoaderAnimate(" opacity-100");
      setTimeout(() => {
        setApiLoaderAnimate(" opacity-0");
      }, 800);
      setTimeout(() => {
        setApiLoaderAnimate(" hidden");
      }, 900);
    } else {
      setApiLoaderAnimate(" opacity-100");
      setTimeout(() => {
        setApiLoaderAnimate(" opacity-0");
      }, 800);
      setTimeout(() => {
        setApiLoaderAnimate(" hidden");
      }, 900);
    }
  };
  //this function send call api for addContact
  const addContact = async () => {
    let message = await (
      await fetch("https://farawin.iran.liara.run/api/contact", {
        method: "POST",
        body: JSON.stringify({
          username: `${addContactFormInputsValue.phoneNumber}`,
          name: `${addContactFormInputsValue.name}`,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      })
    ).json();
    if (message.code === "200") {
      setApiResponseMessage("ok");
      prop.uiControl();
    } else if (message.code === "409") {
      setApiResponseMessage("conflict");
    } else {
      setApiResponseMessage("cant find contact");
    }
  };
  //this function check formValidation
  const formIsValid = () => {
    if (
      addContactFormInputsValue.name.length > 3 &&
      addContactFormInputsValue.phoneNumber.length > 10 &&
      /^09/.test(addContactFormInputsValue.phoneNumber)
    ) {
      console.log(true);
      return true;
    } else return false;
  };
  const getContactList = async () => {
    let contacts = await (
      await fetch("https://farawin.iran.liara.run/api/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      })
    ).json();
    localStorage.setItem("contactList", JSON.stringify(contacts.contactList));
  };
  return (
    <>
      {/** a container this is blur */}
      <div
        className={"w-full h-screen bg-Onyx/40  absolute z-30" + prop.showForm}
      >
        {/** a container for addContactForm */}
        <div
          className={
            "w-80 bg-Onyx drop-shadow-lg text-center rounded-lg p-5 h-fit absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" +
            prop.showForm
          }
        >
          {/** header*/}
          <button
            className="absolute left-5 bg-backArrowIcone w-6 h-6 bg-no-repeat bg-cover  hover:bg-tahiti/90 transition-colors duration-300 rounded-full "
            onClick={prop.uiControl}
          ></button>
          <h1 className="text-bubble-gum font-semibold tracking-widest">
            AddContact
          </h1>
          {/** add Contact Form*/}
          <form>
            {/** input component made for better control our inputs value and control ui */}
            {/** props guide :
             * type : pass input type
             * max & min length : pass input length
             * lableText : a label for our input with some ui now we send a text
             * icone: its span backgroundImg for better ui
             * onChange : send to our input onChange attribute
             * value :  send to our input value
             * patternError : send a text to a paragraph in our comp when phone pattern go wrong that show himSelf
             * patternErrorVisibility : send a " " or " hidden" as prop to inputComp for error vidibility
             * errorOpacity : its another paragraph if phoneNumber dont start with 09 and show himself and hide when condition will be true
             * labelAnimation : our label need change position when user change values just send him up and
             * changeIcone : this is just for password type when user click on icone changeIcone and show new icone
             */}
            <Input
              type="text"
              maxLength={16}
              minLenght={3}
              labelText="name"
              icone={""}
              changeIcone={""}
              onChange={nameInputHandle}
              value={addContactFormInputsValue.name}
              patternError="moreThan 3 char"
              patternErrorVisibility=""
              errorOpacity={
                addContactFormInputsValue.name
                  ? addContactFormInputsValue.name.length > 3
                    ? " opacity-0"
                    : " opacity-100"
                  : " opacity-0"
              }
              labelAnimation={
                addContactFormInputsValue.name ? " -translate-y-7 " : ""
              }
            ></Input>
            <Input
              type="tel"
              maxLength={11}
              minLenght={11}
              labelText="phone number"
              icone={" bg-phoneImg"}
              changeIcone={""}
              onChange={phoneInputHandle}
              value={addContactFormInputsValue.phoneNumber}
              patternError="wrong pattern"
              patternErrorVisibility=""
              errorOpacity={
                addContactFormInputsValue.phoneNumber
                  ? /^09/.test(addContactFormInputsValue.phoneNumber)
                    ? " opacity-0"
                    : " opacity-100"
                  : " opacity-0"
              }
              labelAnimation={
                addContactFormInputsValue.phoneNumber ? " -translate-y-7 " : ""
              }
            ></Input>
            {/** this work like submitButton*/}
            <input
              type="button"
              value="Add"
              onClick={() => {
                setAddContactFormInputsValue({
                  phoneNumber: "",
                  name: "",
                });
                addContact();
                apiResponseLoader();
                getContactList();
              }}
              disabled={formIsValid() ? false : true}
              className={
                "text-Platinum  tracking-widest p-2 w-full mt-8 rounded-lg" +
                (formIsValid()
                  ? " bg-tahiti cursor-pointer"
                  : " bg-tahiti/10 cursor-auto")
              }
            />
          </form>
        </div>
      </div>
      {/** this div is response when user press addButton and show a message*/}
      <div
        className={
          " bg-Onyx/75 w-full h-screen absolute transition-opacity duration-200 z-40" +
          apiLoaderAnimate
        }
      >
        <p className="text-Platinum text-2xl absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {apiResponseMessage === "ok"
            ? "contact added"
            : apiResponseMessage === "conflict"
            ? "contact already is in your list"
            : "cant find contact"}
        </p>
      </div>
    </>
  );
}
