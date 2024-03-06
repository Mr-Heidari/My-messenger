export default function ContextMenu(prop: any) {
  return (
    <div
      className={"absolute z-20 w-10 h-10 bg-red" + (prop.show ? " " : " ")}
      style={{ top: `${prop.pageY}px`, left:`${prop.pageX}px`  }}
    >
      agha halle
    </div>
  );
}
