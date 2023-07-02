import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
// components
import MainLayout from "src/components/MainLayout"

jest.mock("next/router", () => require("next-router-mock"))

describe("test MainLayout", () => {
  it("should render 404 page", async () => {
    render(
      <MainLayout>
        <div>hello world</div>
      </MainLayout>
    )
    expect(screen.getByRole("button", { name: /Go to login/i }))
    expect(screen.getByText(/page not found/i))
    expect(screen.queryByText(/hello world/i)).not.toBeInTheDocument()
  })
})
