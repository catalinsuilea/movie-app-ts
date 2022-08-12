import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import WelcomePage from "./WelcomePage";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

describe("Search bar", () => {
  it("updates on change", () => {
    const mockProp = jest.fn(() => {});
    render(
      <BrowserRouter>
        <WelcomePage setSearch={mockProp} />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText("Search movie...");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });

  it("should clear the input when search buttin is clicked", () => {
    const mockProp = jest.fn(() => {});
    render(
      <BrowserRouter>
        <WelcomePage setMovieTitle={mockProp} setSearch={mockProp} />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText("Search movie...");
    const searchButton = screen.getByTestId("search");
    fireEvent.change(searchButton, { target: { value: "Movie" } });
    fireEvent.click(searchButton);
    expect(searchInput.value).toBe("");
  });
});
