import { GetWorkoutPlansOutput } from "src/types/trpc/router-types"

export const MOCK_WORKOUT_PLANS: GetWorkoutPlansOutput = [
  {
    planId: "e1c88154-a47f-4c88-b50d-76e3e805c08c",
    updatedAt: "2023-07-03T22:39:13.114Z",
    createdAt: "2023-07-03T22:39:13.114Z",
    name: "test123",
    exerciseOrder: [
      "b9ab3aa5-850e-4f32-a910-3cc4514b8eee",
      "ebf517b4-fd5d-4e90-95bd-e6d458666547",
      "c2260d6d-fd4e-4cbd-b006-5a414b8d9e7a",
    ],
    lastWorkout: null,
    duration: null,
    userId: "bbab5589-4955-4a45-b2b1-c17ee04b3c0f",
    targets: [
      {
        targetId: "eadddb82-5be6-4ab7-b9fd-cb51a8fa9c3e",
        updatedAt: "2023-07-03T22:39:13.427Z",
        createdAt: "2023-07-03T22:39:13.427Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "ebf517b4-fd5d-4e90-95bd-e6d458666547",
        planId: "e1c88154-a47f-4c88-b50d-76e3e805c08c",
        exercise: {
          exerciseId: "ebf517b4-fd5d-4e90-95bd-e6d458666547",
          updatedAt: "2023-07-03T01:59:45.088Z",
          createdAt: "2023-07-03T01:59:45.088Z",
          name: "bench",
          description: "",
          url: "",
          userId: "bbab5589-4955-4a45-b2b1-c17ee04b3c0f",
        },
      },
      {
        targetId: "5e91d718-ecf5-4d08-aea6-81ea0c39e7fd",
        updatedAt: "2023-07-03T22:39:13.427Z",
        createdAt: "2023-07-03T22:39:13.427Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "b9ab3aa5-850e-4f32-a910-3cc4514b8eee",
        planId: "e1c88154-a47f-4c88-b50d-76e3e805c08c",
        exercise: {
          exerciseId: "b9ab3aa5-850e-4f32-a910-3cc4514b8eee",
          updatedAt: "2023-07-03T02:00:03.085Z",
          createdAt: "2023-07-03T02:00:03.085Z",
          name: "backrow",
          description: "",
          url: "",
          userId: "bbab5589-4955-4a45-b2b1-c17ee04b3c0f",
        },
      },
      {
        targetId: "67dc673d-be36-43a1-b85c-20e1322a1a2a",
        updatedAt: "2023-07-03T22:39:13.427Z",
        createdAt: "2023-07-03T22:39:13.427Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "c2260d6d-fd4e-4cbd-b006-5a414b8d9e7a",
        planId: "e1c88154-a47f-4c88-b50d-76e3e805c08c",
        exercise: {
          exerciseId: "c2260d6d-fd4e-4cbd-b006-5a414b8d9e7a",
          updatedAt: "2023-07-03T01:59:59.980Z",
          createdAt: "2023-07-03T01:59:59.980Z",
          name: "deadlift",
          description: "",
          url: "",
          userId: "bbab5589-4955-4a45-b2b1-c17ee04b3c0f",
        },
      },
    ],
  },
]
