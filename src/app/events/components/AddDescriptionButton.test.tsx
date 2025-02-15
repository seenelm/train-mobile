import AddDescriptionButton from "./AddDescriptionButton";
import { render } from "@testing-library/react-native";
import React from "react";
import { mockSetEvent, mockEvent, mockEventContext, useEvent } from "../../../mocks/eventMocks";

jest.mock("../context/EventContext", () => ({
  useEvent: () => mockEventContext,
}));

// const mockSetEvent = jest.fn();

function setup() {
  // (useEvent as jest.Mock).mockReturnValue({
  //   event: { description: "" },
  //   setEvent: mockSetEvent,
  // });

  return render(<AddDescriptionButton />);
}

describe("AddDescriptionButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = setup();
    expect(getByText("Add Description")).toBeTruthy();
  });
});
