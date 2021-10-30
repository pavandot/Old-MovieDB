import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";

test("component changes on button click", () => {
	render(<Home />);

	userEvent.click();
});
