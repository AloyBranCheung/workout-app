import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
// component
import TopNavbar from "src/components/MainLayout/TopNavbar"

jest.mock("next/router", () => require("next-router-mock"))
const mockFn = jest.fn()

describe("TopNavbar", () => {
  it("renders a topnavbar", async () => {
    render(
      <TopNavbar
        isMenuOpen={false}
        onClickLogout={mockFn}
        onClickBrand={mockFn}
        onClickPlan={mockFn}
        onToggleMenu={mockFn}
      />
    )

    const heading = await screen.getByRole("heading", {
      name: /simplyworkouts/i,
    })
    const hamburgerIcon = await screen.getByRole("img", {
      name: /navbar-menu-icon/i,
    })

    expect(heading).toBeInTheDocument()
    expect(hamburgerIcon).toBeInTheDocument()
  })

  it("shows dropdown menu", async () => {
    render(
      <TopNavbar
        onClickLogout={mockFn}
        onClickBrand={mockFn}
        onClickPlan={mockFn}
        onToggleMenu={mockFn}
        isMenuOpen={true}
      />
    )
    const user = userEvent.setup()
    await hamburgerIcon = await screen.getByRole('img', {  name: /navbar\-menu\-icon/i})
    
    // expect mockFn toHaveBeenCalled

    const logoutBtn = screen.getByRole("button", { name: /logout/i })

    screen.debug()
  })
})
