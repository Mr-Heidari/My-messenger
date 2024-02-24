export default function MessengerHomePage() {
  return (
    <>
      <div className="bg-Onyx w-full h-screen ">
        <div className=" felx flex-row w-full h-screen justify-between">
          {/**sidebar for user typess**/}
          <div className="w-9 bg-metal h-full order-0"></div>
          {/**message side*/}
          <div className="w-10 border-none rounded-lg h-full bg-purple order-1"></div>
        </div>
      </div>
    </>
  );
}
