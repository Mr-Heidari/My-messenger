import Input from "./InputComp";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function SignUpPage() {
  const [users, SetUsers] = useState([
    {
      username: "",
      password: "",
    },
  ]);
  // navigate send user to home page
  const navigate = useNavigate();
  //save inputValues for eachtime our component rendered
  const [inputValue, setInputValue] = useState({
    phonNumber: "",
    password: "",
    confirmedPassword: "",
    name: "",
  });
  //get Available User
  useEffect(() => {
    let timer = setInterval(() => {
      async function getUsers() {
        return await (await fetch("https://farawin.iran.liara.run/api/user"))
          .json()
          .then((userList) => {
            SetUsers(userList.userList);
            console.log(users);
          });
      }
      getUsers();
    }, 1000);
    return () => clearInterval(timer);
  });
  //handle phoneInput just get number
  const phoneInputHandle = (event: any) => {
    if (/\d$/.test(event.target.value)) {
      setInputValue({
        ...inputValue,
        phonNumber: event.target.value,
      });
    } else if (!event.target.value) {
      setInputValue({
        ...inputValue,
        phonNumber: "",
      });
    }
  };
  //just save password without logicComplexity
  const passwrodInputHandle = (event: any) => {
    setInputValue({
      ...inputValue,
      password: event.target.value,
    });
  };
  //just save confirmedPassword without logicComplexity
  const confirmedPasswordHandle = (event: any) => {
    setInputValue({
      ...inputValue,
      confirmedPassword: event.target.value,
    });
  };
  //get nameInputValues
  const nameInputHandle = (event: any) => {
    setInputValue({
      ...inputValue,
      name: event.target.value,
    });
  };
  //check form Validation Conditions for control sumbit btn enable or disable
  const formIsValid = (): boolean | undefined => {
    if (
      /^09/.test(inputValue.phonNumber) &&
      inputValue.password.length > 8 &&
      inputValue.phonNumber.length > 10 &&
      inputValue.password === inputValue.confirmedPassword &&
      inputValue.name.length > 3
    ) {
      return false;
    } else return true;
  };
  //send post method to api for register user
  let handleSubmit = async function (event: any) {
    let message = await (
      await fetch("https://farawin.iran.liara.run/api/user", {
        method: "POST",
        body: JSON.stringify({
          username: `${inputValue.phonNumber}`,
          password: `${inputValue.password}`,
          name: `${inputValue.name}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    if (message.message === "با موفقیت افزوده شد.") {
      event.preventDefault();
      navigate("/Login");
    } else {
      window.location.reload();
    }
  };
  return (
    <div className="bg-Onyx w-full h-screen  bg-cover ">
      {/** a container for our login form */}
      <div className="w-80 h-fit absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-Platinum p-5 ">
        <form className="text-center">
          <h1 className="text-Platinum font-semibold text-xl">SignUp</h1>
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
          <Input
            type="tel"
            maxLength={11}
            minLenght={11}
            labelText="phone number"
            icone={" bg-phoneImg"}
            changeIcone={""}
            onChange={phoneInputHandle}
            value={inputValue.phonNumber}
            patternError="wrong pattern"
            patternErrorVisibility=""
            errorOpacity={
              inputValue.phonNumber
                ? /^09/.test(inputValue.phonNumber)
                  ? " opacity-0"
                  : " opacity-100"
                : " opacity-0"
            }
            labelAnimation={inputValue.phonNumber ? " -translate-y-7 " : ""}
          ></Input>

          <Input
            type="password"
            passwordReapet={false}
            maxLength={16}
            minLenght={8}
            labelText="password"
            icone={" bg-hideImg"}
            changeIcone={" bg-showImg"}
            onChange={passwrodInputHandle}
            value={inputValue.password}
            patternError=""
            patternErrorVisibility=" hidden"
            labelAnimation={inputValue.password ? " -translate-y-7 " : ""}
          ></Input>
          <Input
            type="password"
            passwordReapet={true}
            passwordReapetValue={inputValue.password}
            maxLength={16}
            minLenght={8}
            labelText="confirm password"
            icone={" bg-hideImg"}
            changeIcone={" bg-showImg"}
            onChange={confirmedPasswordHandle}
            value={inputValue.confirmedPassword}
            patternError=""
            patternErrorVisibility=" hidden"
            labelAnimation={
              inputValue.confirmedPassword ? " -translate-y-7 " : ""
            }
          ></Input>
          {/** submit button will be enable when our from is valided  */}
          <input
            onClick={handleSubmit}
            type="button"
            value={"Submit"}
            className={
              "w-full h-10 rounded-lg mt-8 text-Onyx" +
              (formIsValid()
                ? " bg-Platinum opacity-20 "
                : " bg-tahiti text-Onyx  cursor-pointer")
            }
            disabled={formIsValid()}
          />
        </form>
        {/** link to login page */}
        <div className=" mt-4">
          <Link to="/Login" className="text-Platinum underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
