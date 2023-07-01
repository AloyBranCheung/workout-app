import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
// components
import Workouts from "src/components/Workouts"
// mocks
import { MOCK_WORKOUT_PLANS } from "src/mocks/workouts"

jest.mock("next/router", () => require("next-router-mock"))

describe("test Workouts Page", () => {
  it("should render 'get started'", async () => {
    render(<Workouts plans={{ workoutPlans: [] }} />)
    expect(
      screen.getByRole("button", { name: /Get Started/i })
    ).toBeInTheDocument()
  })

  it("should render three workout templates", async () => {
    render(<Workouts plans={{ workoutPlans: MOCK_WORKOUT_PLANS }} />)
    expect(
      screen.queryByRole("button", { name: /Get Started/i })
    ).not.toBeInTheDocument()

    for (let i = 0; i < MOCK_WORKOUT_PLANS.length; i++) {
      const string = `workout plan ${i + 1}`
      const title = screen.getByText(new RegExp(string, "i"))
      expect(title).toBeInTheDocument()
    }
  })
})
