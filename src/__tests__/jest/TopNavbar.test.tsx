import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
// component
import TopNavbar from "src/components/MainLayout/TopNavbar"

const mockFn = jest.fn()

const topNavbar = async () => {
  const heading = await screen.getByRole("heading", {
    name: /simplyworkouts/i,
  })
  const hamburgerIcon = await screen.getByRole("img", {
    name: /navbar-menu-icon/i,
  })
  return { heading, hamburgerIcon }
}

describe("test MainLayout's TopNavbar", () => {
  it("should render a topnavbar", async () => {
    render(
      <TopNavbar
        isMenuOpen={false}
        onClickLogout={mockFn}
        onClickBrand={mockFn}
        onClickPlan={mockFn}
        onToggleMenu={mockFn}
        onClickExercises={mockFn}
        onClickRuns={mockFn}
      />
    )

    const { heading, hamburgerIcon } = await topNavbar()

    const logoutBtn = await screen.queryByRole("button", { name: /logout/i })
    expect(logoutBtn).not.toBeInTheDocument()

    expect(heading).toBeInTheDocument()
    expect(hamburgerIcon).toBeInTheDocument()
  })

  it("should show a dropdown menu", async () => {
    const user = userEvent.setup()
    render(
      <TopNavbar
        onClickLogout={mockFn}
        onClickBrand={mockFn}
        onClickPlan={mockFn}
        onToggleMenu={mockFn}
        isMenuOpen={true}
        onClickExercises={mockFn}
        onClickRuns={mockFn}
      />
    )
    const { hamburgerIcon, heading } = await topNavbar()
    expect(heading).toBeInTheDocument()
    expect(hamburgerIcon).toBeInTheDocument()

    await user.click(hamburgerIcon)
    expect(mockFn).toHaveBeenCalled()

    const logoutBtn = await screen.getByRole("button", { name: /logout/i })
    expect(logoutBtn).toBeInTheDocument()
  })
})
