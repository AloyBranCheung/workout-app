import { GetWorkoutPlansOutput } from "src/types/trpc/router-types"

export const MOCK_WORKOUT_PLANS: GetWorkoutPlansOutput = [
  {
    planId: "25eb6ffa-29a9-47cd-a43c-aac6877d1006",
    updatedAt: "2023-11-05T13:03:22.606Z",
    createdAt: "2023-11-05T13:03:22.606Z",
    name: "push",
    exerciseOrder: [
      "b578dfba-2599-4484-a72a-c7c37a9f0664",
      "3142047d-943b-4161-855e-18d359d22c62",
      "0070be4a-3821-403c-a6b1-0ad803386d13",
      "22b98b2a-a176-4bc1-aa92-b6a911ef0f20",
      "78c1392b-304d-4f4c-ace3-d3b5a94e25ae",
      "5fbea3e6-e1aa-4193-9226-dbd1573b8ea0",
    ],
    lastWorkout: null,
    duration: null,
    userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
    gymId: "66bafe3e-1051-4331-8a4a-e6d18e82cdab",
    gymLocation: {
      name: "apt gym",
      gymId: "1",
    },
  },
  {
    planId: "7dabc5fe-b05a-410f-818b-e6a5933622c7",
    updatedAt: "2023-11-05T13:04:05.643Z",
    createdAt: "2023-11-05T13:04:05.643Z",
    name: "option 2 location",
    exerciseOrder: [
      "b578dfba-2599-4484-a72a-c7c37a9f0664",
      "3142047d-943b-4161-855e-18d359d22c62",
      "0070be4a-3821-403c-a6b1-0ad803386d13",
    ],
    lastWorkout: null,
    duration: null,
    userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
    gymId: "61e2c21b-8fea-47bd-8fac-1fac17c628fa",
    gymLocation: {
      name: "option 2",
      gymId: "2",
    },
  },
  {
    planId: "08c45387-1f30-4d4d-82c4-3fd8d746ec06",
    updatedAt: "2023-11-05T13:34:53.363Z",
    createdAt: "2023-11-05T13:34:53.363Z",
    name: "test2",
    exerciseOrder: [
      "b578dfba-2599-4484-a72a-c7c37a9f0664",
      "3142047d-943b-4161-855e-18d359d22c62",
      "0070be4a-3821-403c-a6b1-0ad803386d13",
    ],
    lastWorkout: null,
    duration: null,
    userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
    gymId: "66bafe3e-1051-4331-8a4a-e6d18e82cdab",
    gymLocation: {
      name: "apt gym",
      gymId: "3",
    },
  },
  {
    planId: "3a615af4-0ead-4637-bd6a-c48f0c292756",
    updatedAt: "2023-11-05T13:35:10.401Z",
    createdAt: "2023-11-05T13:35:10.401Z",
    name: "test 3",
    exerciseOrder: [
      "22b98b2a-a176-4bc1-aa92-b6a911ef0f20",
      "78c1392b-304d-4f4c-ace3-d3b5a94e25ae",
      "5fbea3e6-e1aa-4193-9226-dbd1573b8ea0",
    ],
    lastWorkout: null,
    duration: null,
    userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
    gymId: "66bafe3e-1051-4331-8a4a-e6d18e82cdab",
    gymLocation: {
      name: "apt gym",
      gymId: "4",
    },
  },
]
