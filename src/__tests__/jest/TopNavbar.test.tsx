import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
// component
import TopNavbar from "src/components/MainLayout/TopNavbar"

describe("TopNavbar", () => {
  it("renders a topnavbar", async () => {
    render(<TopNavbar />)
    const user = userEvent.setup()

    const heading = screen.getByRole("heading", {
      name: /simplyworkouts/i,
    })
    const hamburgerIcon = screen.getByRole("img", {
      name: /navbar-menu-icon/i,
    })

    expect(heading).toBeInTheDocument()
    expect(hamburgerIcon).toBeInTheDocument()

    await user.click(hamburgerIcon)
    screen.debug()
  })
})
