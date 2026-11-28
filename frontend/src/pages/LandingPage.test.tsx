import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import LandingPage from "./LandingPage";
describe("LandingPage",()=>{
  it("shows Burmese automatically and saves the translated entry for review", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(Response.json({
        words: [{ reading: { kanji: "猫", kana: "ねこ" }, senses: [{ glosses: ["cat"] }] }],
        kanji: [],
      }))
      .mockResolvedValueOnce(Response.json({
        responseStatus: 200, responseData: { translatedText: "ကြောင်" },
      }));
    try {
      render(<LandingPage />);
      fireEvent.change(screen.getByLabelText("ဂျပန်စကားလုံး ရှာပါ"), { target: { value: "猫" } });
      fireEvent.click(screen.getByRole("button", { name: "ရှာမယ်" }));
      expect(await screen.findByText("ကြောင်")).toBeInTheDocument();
      expect(fetchMock.mock.calls[1]?.[0]).toContain("langpair=en%7Cmy");
      fireEvent.click(screen.getByRole("button", { name: "သိမ်းမယ်" }));
      fireEvent.click(screen.getByRole("button", { name: "အဖြေပြပါ" }));
      expect(screen.getByText(/· ကြောင်/)).toBeInTheDocument();
    } finally {
      fetchMock.mockRestore();
    }
  });
  it("switches the interface language",()=>{render(<LandingPage/>);fireEvent.change(screen.getByRole("combobox",{name:"Language"}),{target:{value:"en"}});expect(screen.getByRole("heading",{name:"Japanese dictionary & Burmese translation"})).toBeInTheDocument();});
});
