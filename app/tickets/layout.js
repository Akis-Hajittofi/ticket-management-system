import Nav from "../Nav";
import Controls from "./Controls";

export default function TicketsLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Nav />
      {/* <div className="flex flex-rows">{children}</div> */}
      <div className="">{children}</div>
    </div>
  );
}
