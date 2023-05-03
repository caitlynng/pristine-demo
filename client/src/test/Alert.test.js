import React from "react";
import { render } from "@testing-library/react";
import { useAppContext } from "../context/appContext.js";
import Alert from "../components/Alert.js";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../context/appContext.js");

describe("Alert component", () => {
  it("renders with the correct class and text based on context values", () => {
    const alertType = "warning";
    const alertText = "This is a warning alert.";

    useAppContext.mockReturnValue({ alertType, alertText });

    const { container, getByText } = render(<Alert />);

    const alertElement = container.querySelector(`.alert.alert-${alertType}`);
    expect(alertElement).toBeInTheDocument();
    expect(getByText(alertText)).toBeInTheDocument();
  });
});
