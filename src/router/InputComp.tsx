import { useState } from "react";
// creat comp for our input with so many ui 
export default function Input(prop: any) {
  // get props from parent if type=password we can change type when user click on icone so we need state
  const [inputType, setInputType] = useState({
    type: prop.type,
    icone: prop.icone,
  });
  return (
    // container
    <div className="relative mt-12">
      {/** we use span for a label and set dynamic positoin */}
      <span
        className={
          "absolute text-Platinum transition-all  duration-300 bottom-2" +
          prop.labelAnimation
        }
      >
        {prop.labelText}
      </span>
      {/** when user import wrong pattern this used on phoneNumber input */}
      <span
        className={
          "text-xs text-bubble-gum absolute transition-opacity opacity-0 duration-300 bottom-4" +
          prop.patternError +
          prop.errorOpacity
        }
      >
        wrong pattern
      </span>
      {/** we get user password or phoneNumber */}
      <input
        maxLength={prop.maxLength}
        minLength={prop.minLenght}
        value={prop.value}
        onChange={prop.onChange}
        type={inputType.type}
        className={
          " border-b-2  text-center border-b-Platinum outline-none bg-transparent w-full h-10 text-Platinum"
        }
      />
      {/** we have some errorsParagraph we made comp with some ui and some condition for better ui */}
      {/** validationParagraph guide =
       * confirmedPassword : send boolean if our passwordInputs are equal
       * passwordIsReapeated : send boolean if password should be repeated in our repeatedPasswrodInput 
       * inputValue : send inputValue for control ui with some conditions
       * valided : send string if type===tel or not send css code  if our condition is valid all error will be hide
      */}
      <ValidationParagraph
        confirmedPassword={prop.passwordReapet}
        passwordIsRepeated={
          prop.passwordReapetValue === prop.value ? true : false
        }
        inputValue={prop.value}
        type={prop.type}
        length={prop.value.length}
        valided={
          prop.type === "tel"
            ? prop.value.length > 10
              ? " opacity-0"
              : " opacity-100"
            : prop.value.length > 7
            ? /[a-z]/.test(prop.value) && /[A-Z]/.test(prop.value)
              ? " opacity-0"
              : " opacity-100"
            : " opacity-100"
        }
      ></ValidationParagraph>
      {/** a span for input icones */}
      {/** if inputComponent dont have changeIcone prop dont change icone img that mean if inputType!==tel changeIcone when use click on span*/}
      <span
        className={
          "absolute transition-all  duration-100 right-0 bg-contain w-6  h-6  bottom-2" +
          inputType.icone
        }
        onClick={() => {
          if (inputType.icone === prop.icone && prop.changeIcone) {
            setInputType({
              type: "text",
              icone: prop.changeIcone,
            });
          } else if (inputType.icone === prop.changeIcone) {
            setInputType({
              type: "password",
              icone: prop.icone,
            });
          }
        }}
      ></span>
    </div>
  );
}
//ValidationParagraph is component for show some error with better ui and render diffrent html with some conditions
function ValidationParagraph(prop: any) {
  if (prop.type === "password" && !prop.confirmedPassword) {
    return (
      <p
        className={
          "absolute left-1/2 -translate-x-1/2 text-bubble-gum w-full text-xs  transition-opacity  order-0 duration-700 " +
          prop.valided
        }
      >
        {prop.inputValue
          ? "The password must have atleast 8 characters and atleast one lower and uppercase "
          : " "}
      </p>
    );
  } else if (prop.type === "tel") {
    return (
      <div className="mt-2">
        <p
          className={
            "absolute left-1/2 -translate-x-1/2 text-bubble-gum w-full text-sm  transition-opacity duration-700" +
            prop.valided
          }
        >
          {prop.inputValue
            ? /^09/.test(prop.inputValue)
              ? prop.length > 10
                ? "phoneNumber shouldBe 11 numbers"
                : "phoneNumber shouldBe 11 numbers"
              : "phoneNumber shouldeBe startwith 09"
            : ""}
        </p>
      </div>
    );
  } else if (prop.type === "password" && prop.confirmedPassword) {
    return (
      <p
        className={
          "absolute w-full  text-sm" +
          (prop.passwordIsRepeated ? " text-Platinum" : " text-bubble-gum ")
        }
      >
        {prop.inputValue
          ? prop.passwordIsRepeated
            ? "Confirmed "
            : "Not Confimed Yet"
          : ""}
      </p>
    );
  }
}
