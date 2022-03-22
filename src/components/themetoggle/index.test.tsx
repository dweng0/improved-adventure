import ThemeToggle from "./index";
import App from "../../App";
import { render } from "@testing-library/react";

describe("Testing theme toggle button", () => {
    it("should compile at runtime", () => expect(ThemeToggle).toBeDefined());
    it("Should show the correct icon depending on the theme context provided, default light", () => {
        //setup
        //execute
        const { getByTestId } = render(<ThemeToggle />);

        //verify
        expect(getByTestId("Brightness4Icon")).toBeInTheDocument();
    });
})