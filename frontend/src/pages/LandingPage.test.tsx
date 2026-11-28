import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it} from "vitest";
import LandingPage from "./LandingPage";
describe("LandingPage",()=>{
  it("searches the local vocabulary collection",()=>{render(<LandingPage/>);fireEvent.change(screen.getByRole("textbox"),{target:{value:"komorebi"}});expect(screen.getByText("木漏れ日")).toBeInTheDocument();expect(screen.queryByText("美味しい")).not.toBeInTheDocument();});
  it("switches the interface language",()=>{render(<LandingPage/>);fireEvent.change(screen.getByRole("combobox"),{target:{value:"en"}});expect(screen.getByRole("heading",{name:/closer to Japan/i})).toBeInTheDocument();});
});
