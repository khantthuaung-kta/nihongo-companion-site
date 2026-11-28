import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import LandingPage from "./LandingPage";
describe("LandingPage",()=>{
  it("shows and saves dictionary entries without calling the translator", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(Response.json({
        words: [{ reading: { kanji: "猫", kana: "ねこ" }, senses: [{ glosses: ["cat"] }] }],
        kanji: [],
      }));
    try {
      render(<LandingPage />);
      fireEvent.change(screen.getByLabelText("ဂျပန်စကားလုံး ရှာပါ"), { target: { value: "猫" } });
      fireEvent.click(screen.getByRole("button", { name: "ရှာမယ်" }));
      expect(await screen.findByText("cat")).toBeInTheDocument();
      expect(fetchMock).toHaveBeenCalledTimes(1);
      fireEvent.click(screen.getByRole("button", { name: "သိမ်းမယ်" }));
      fireEvent.click(screen.getByRole("button", { name: "အဖြေပြပါ" }));
      expect(screen.getByText(/· cat/)).toBeInTheDocument();
    } finally {
      fetchMock.mockRestore();
    }
  });
  it("switches the interface language",()=>{render(<LandingPage/>);fireEvent.change(screen.getByRole("combobox",{name:"Language"}),{target:{value:"en"}});expect(screen.getByRole("heading",{name:"Japanese dictionary & Burmese translation"})).toBeInTheDocument();});
});
