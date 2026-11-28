import {render,screen} from "@testing-library/react";
import {describe,expect,it} from "vitest";
import App from "./App";
describe("App",()=>{it("renders the vocabulary experience",()=>{render(<App/>);expect(screen.getByText("Companion",{exact:false})).toBeInTheDocument();});});
