import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
// component
import MainLayout from "src/components/MainLayout"

jest.mock("next/router", () => require("next-router-mock"))

describe("TopNavbar", () => {
  it("renders a topnavbar", async () => {
    render(<MainLayout>hello world</MainLayout>)
    const user = userEvent.setup()

    // https://stackoverflow.com/questions/68865784/testing-react-components-that-get-state-setstate-properties-passed-by-parent

    screen.debug()
    // const heading = screen.getByRole("heading", {
    //   name: /simplyworkouts/i,
    // })
    // const hamburgerIcon = screen.getByRole("img", {
    //   name: /navbar-menu-icon/i,
    // })

    // expect(heading).toBeInTheDocument()
    // expect(hamburgerIcon).toBeInTheDocument()

    // await user.click(hamburgerIcon)
  })
})
