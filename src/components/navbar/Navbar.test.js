import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
test("login btn", () => {
	window.sessionId = null;
	render(<Navbar />);
	const loginBtn = screen.getByText("login", { exact: false });
	expect(loginBtn).toBeInTheDocument();
});
