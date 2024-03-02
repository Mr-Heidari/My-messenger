import { useState } from "react";
import Input from "./InputComp";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Login-Page Component
export default function LoginPage() {
  // navigate send user to home page
  const navigate = useNavigate();
  //save inputValues for eachtime our component rendered
  const [inputValue, setInputValue] = useState({
    phonNumber: "",
    password: "",
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
  //just save password without logic Complexity
  const passwrodInputHandle = (event: any) => {
    setInputValue({
      ...inputValue,
      password: event.target.value,
    });
  };

  //check form Validation Conditions
  const formIsValid = (): boolean | undefined => {
    if (
      /^09/.test(inputValue.phonNumber) &&
      inputValue.password.length > 8 &&
      /[a-z]/.test(inputValue.password) &&
      /[A-Z]/.test(inputValue.password) &&
      inputValue.phonNumber.length > 10
    ) {
      return false;
    } else return true;
  };
  // if the user has already registered will enter messenger page
  const handleSubmit = async (event: any) => {
    let message = await (
      await fetch("https://farawin.iran.liara.run/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          username: `${inputValue.phonNumber}`,
          password: `${inputValue.password}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    if (message.code === "200") {
      localStorage.setItem("token", `${message.token}`);
      localStorage.setItem("username", `${message.user.username}`);
      navigate("/Home");
    } else {
      window.location.reload();
    }
    console.log(message);
  };
  return (
    <div className="bg-Onyx w-full h-screen  bg-cover ">
      {/** a container for our login form */}
      <div className="w-80 h-fit absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-Platinum p-5 ">
        <form onSubmit={handleSubmit} className="text-center">
          <h1 className="text-Platinum font-semibold text-xl">Login</h1>
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
          {/** password Comp */}
          <Input
            type="password"
            maxLength={16}
            minLenght={8}
            labelText="password"
            icone={" bg-hideImg"}
            changeIcone={" bg-showImg"}
            onChange={passwrodInputHandle}
            value={inputValue.password}
            patternError=" hidden"
            labelAnimation={inputValue.password ? " -translate-y-7 " : ""}
          ></Input>
          {/** submit button will be enable when our from is valided  */}
          <input
            onClick={handleSubmit}
            type="button"
            value={"Submit"}
            className={
              "w-full h-10 rounded-lg mt-10 text-Onyx" +
              (formIsValid()
                ? " bg-Platinum opacity-20 "
                : " bg-tahiti text-Onyx  cursor-pointer")
            }
            disabled={formIsValid()}
          />
        </form>
        {/** link to signUp page */}
        <div className=" mt-4">
          <Link to="/signup" className="text-Platinum underline">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
