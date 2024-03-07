import { useState } from "react";

export default function Menu(prop: any) {
  const [name]=useState(localStorage.getItem("name"))
  return (
    <div
      onClick={prop.hideMenu}
      className={
        "absolute w-full h-screen bg-Onyx/40 z-40" +
        (prop.showMenu ? "" : " hidden")
      }
    >
      <div className="absolute w-56 h-screen bg-dimGray shadow-2xl ">
        <div className="w-full h-full ">
          <div className="w-16 border-none rounded-full  h-16 left-3 top-3 absolute box-border bg-purple2/60 text-center text-xl font-semibold text-Platinum pt-4">
          {name?.[0]}
          </div>
          <p className="absolute left-3 top-24 text-Platinum ">
            {localStorage.getItem("name")}
          </p>
          <p className="absolute left-3 top-32 text-Platinum ">
            {localStorage.getItem("username")}
          </p>
        </div>
      </div>
    </div>
  );
}
