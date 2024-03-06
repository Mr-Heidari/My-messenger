export default function Menu(prop: any) {
    return (
      <div
        onClick={prop.hideMenu}
        className={
          "absolute w-full h-screen bg-Onyx/40 z-40" +
          (prop.showMenu ? "" : " hidden")
        }
      >
        <div className="absolute w-56 h-screen bg-dimGray shadow-2xl "></div>
      </div>
    );
  }