import { useState } from "react";
import Input from "../InputComp.tsx";
export default function EditForm(prop: any) {
  //save inputValue
  const [inputValue, setInputValue] = useState({
    phonNumber: prop.phoneNumber,
    name: "",
  });
  //call api for editContact
  const editContact = async () => {
    let message = await (
      await fetch("https://farawin.iran.liara.run/api/contact", {
        method: "PUT",
        body: JSON.stringify({
          username: `${prop.phoneNumber}`,
          name: `${inputValue.name}`,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      })
    ).json();
    if (message.code === "200") {
        console.log(message.code)
      prop.formVisibilityControl({
        ...prop.formControl,
        formVisibility: " hidden",
      });
    }else{
        prop.formVisibilityControl({
            ...prop.formControl,
            formVisibility: " ",
          });
    }
  };
  //set name Value
  const nameInputHandle = (event: any) => {
    setInputValue({
      ...inputValue,
      name: event.target.value,
    });
  };
   //set phoneNumber in editForm by prop 
  const phoneInputHandle = () => {
    setInputValue({
      ...inputValue,
      phonNumber: prop.phoneNumber,
    });
  };
  //this for just need check nameValueLenght
  const formValidation = () => {
    if (inputValue.name.length > 3) {
      return true;
    }
    return false;
  };
  return (
    <div
      className={" w-full h-screen  absolute bg-Onyx/40 z-40 " + prop.formShow}
    >
        {/** container */}
      <div className="w-80 h-fit bg-Onyx absolute shadow-lg -translate-y-1/2 text-center top-1/2 left-1/2 -translate-x-1/2 p-5">
        {/**edit Header */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-Platinum font-semibold">
          Edit
        </h1>
        {/** this button hide form */}
        <button
          className="absolute left-5 bg-backArrowIcone w-6 h-6 bg-no-repeat bg-cover  hover:bg-tahiti/90 transition-colors duration-300 rounded-full "
          onClick={() => {
            prop.formVisibilityControl({
              ...prop.formControl,
              formVisibility: " hidden",
            });
          }}
        >
        </button>
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
          type="tel"
          maxLength={11}
          minLenght={11}
          labelText="phone number"
          icone={" bg-phoneImg"}
          changeIcone={""}
          onChange={phoneInputHandle}
          value={prop.phoneNumber}
          patternError="wrong pattern"
          patternErrorVisibility=""
          errorOpacity={
            inputValue.phonNumber
              ? /^09/.test(inputValue.phonNumber)
                ? " opacity-0"
                : " opacity-100"
              : " opacity-0"
          }
          labelAnimation={
            inputValue.phonNumber ? " -translate-y-7 " : " -translate-y-7 "
          }
        ></Input>
        <Input
          type="text"
          maxLength={11}
          minLenght={11}
          labelText="name"
          icone={"5115"}
          changeIcone={""}
          onChange={nameInputHandle}
          value={inputValue.name}
          patternError="morethan 3 char"
          patternErrorVisibility=""
          errorOpacity={
            inputValue.name
              ? inputValue.name.length > 3
                ? " opacity-0"
                : " opacity-100"
              : " opacity-0"
          }
          labelAnimation={inputValue.name ? " -translate-y-7 " : ""}
        ></Input>
        {/**this work like submit Button will enable wjen formIsValid */}
        <input
          type="button"
          disabled={formValidation() ? false : true}
          className={
            "text-Platinum w-full mt-8 h-10 rounded-lg  transition-colors duration-500" +
            (formValidation() ? " bg-tahiti cursor-pointer" : " bg-tahiti/20")
          }
          value={"Rename"}
          onClick={editContact}
        />
      </div>
    </div>
  );
}
