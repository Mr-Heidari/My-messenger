import { Link } from "react-router-dom";
//this component is like intro user select signUp or login
export default function GoToTheMessengerPage() {
  return (
    <>
      <div className="w-full h-screen bg-Onyx">
        <div className="w-80 h-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center flex flex-col ">
          <span className="order-0 bg-messengerLogo border-none outline-none w-24 h-24 " />
          <Link to="Login" className=" w-full">
            <div className="border-Platinum rounded-md h-16 border-2 order-1 w-full text-center text-Platinum flex flex-row relative">
              <p className="order-0  m-auto max-w-64">
                do you already have an account? Login now...
              </p>
              <span className="order-1 bg-no-repeat bg-contain bg-LoginNowImg w-10 h-10 m-auto" />
            </div>
          </Link>
          <Link to="SignUp" className=" w-full">
            <div className="border-Platinum border-2 rounded-md h-16  order-1 w-full text-center text-Platinum flex flex-row relative mt-3">
              <p className="order-0  m-auto max-w-64">
                dont have an account? Singup now...
              </p>
              <span className="order-1 bg-no-repeat bg-contain bg-SingUpImg w-10 h-10 m-auto" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
