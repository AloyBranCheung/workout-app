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
    targets: [
      {
        targetId: "f3d9d428-ab55-41e8-bb4e-a9853d9200f5",
        updatedAt: "2023-11-05T13:03:22.974Z",
        createdAt: "2023-11-05T13:03:22.974Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "b578dfba-2599-4484-a72a-c7c37a9f0664",
        planId: "25eb6ffa-29a9-47cd-a43c-aac6877d1006",
        exercise: {
          exerciseId: "b578dfba-2599-4484-a72a-c7c37a9f0664",
          updatedAt: "2023-11-05T13:01:57.010Z",
          createdAt: "2023-11-05T13:01:57.010Z",
          name: "DB Bench Press",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "fdb7ee2d-82de-452f-81b6-04a2158667fa",
        updatedAt: "2023-11-05T13:03:22.974Z",
        createdAt: "2023-11-05T13:03:22.974Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "3142047d-943b-4161-855e-18d359d22c62",
        planId: "25eb6ffa-29a9-47cd-a43c-aac6877d1006",
        exercise: {
          exerciseId: "3142047d-943b-4161-855e-18d359d22c62",
          updatedAt: "2023-11-05T13:02:19.881Z",
          createdAt: "2023-11-05T13:02:19.881Z",
          name: "Lat shoulder raise",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "9006739b-83d9-4345-83c7-fad269ea3d63",
        updatedAt: "2023-11-05T13:03:22.974Z",
        createdAt: "2023-11-05T13:03:22.974Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "78c1392b-304d-4f4c-ace3-d3b5a94e25ae",
        planId: "25eb6ffa-29a9-47cd-a43c-aac6877d1006",
        exercise: {
          exerciseId: "78c1392b-304d-4f4c-ace3-d3b5a94e25ae",
          updatedAt: "2023-11-05T13:02:35.456Z",
          createdAt: "2023-11-05T13:02:35.456Z",
          name: "Machine Tricep bar pushdown",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "c7f90ccc-9c16-4aa2-9126-f6bbdaa06a82",
        updatedAt: "2023-11-05T13:03:22.974Z",
        createdAt: "2023-11-05T13:03:22.974Z",
        targetReps: -18,
        targetSets: 3,
        exerciseId: "22b98b2a-a176-4bc1-aa92-b6a911ef0f20",
        planId: "25eb6ffa-29a9-47cd-a43c-aac6877d1006",
        exercise: {
          exerciseId: "22b98b2a-a176-4bc1-aa92-b6a911ef0f20",
          updatedAt: "2023-11-05T13:02:26.688Z",
          createdAt: "2023-11-05T13:02:26.688Z",
          name: "Machine Shoulder Press",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "70018b26-9ce3-4424-aa3c-64d98d85ef55",
        updatedAt: "2023-11-05T13:03:22.974Z",
        createdAt: "2023-11-05T13:03:22.974Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "0070be4a-3821-403c-a6b1-0ad803386d13",
        planId: "25eb6ffa-29a9-47cd-a43c-aac6877d1006",
        exercise: {
          exerciseId: "0070be4a-3821-403c-a6b1-0ad803386d13",
          updatedAt: "2023-11-05T13:01:50.550Z",
          createdAt: "2023-11-05T13:01:50.550Z",
          name: "Machine Bench Press",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "92cf81db-ae4b-48a7-bf35-a718a576d627",
        updatedAt: "2023-11-05T13:03:22.974Z",
        createdAt: "2023-11-05T13:03:22.974Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "5fbea3e6-e1aa-4193-9226-dbd1573b8ea0",
        planId: "25eb6ffa-29a9-47cd-a43c-aac6877d1006",
        exercise: {
          exerciseId: "5fbea3e6-e1aa-4193-9226-dbd1573b8ea0",
          updatedAt: "2023-11-05T13:02:48.494Z",
          createdAt: "2023-11-05T13:02:48.494Z",
          name: "Tricep single arm db raise",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
    ],
    gymLocation: {
      name: "apt gym",
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
    targets: [
      {
        targetId: "0e973b7a-a869-426d-96e8-ea96fb7917ee",
        updatedAt: "2023-11-05T13:04:05.984Z",
        createdAt: "2023-11-05T13:04:05.984Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "b578dfba-2599-4484-a72a-c7c37a9f0664",
        planId: "7dabc5fe-b05a-410f-818b-e6a5933622c7",
        exercise: {
          exerciseId: "b578dfba-2599-4484-a72a-c7c37a9f0664",
          updatedAt: "2023-11-05T13:01:57.010Z",
          createdAt: "2023-11-05T13:01:57.010Z",
          name: "DB Bench Press",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "81974585-7adb-4461-919e-db995cee7998",
        updatedAt: "2023-11-05T13:04:05.984Z",
        createdAt: "2023-11-05T13:04:05.984Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "3142047d-943b-4161-855e-18d359d22c62",
        planId: "7dabc5fe-b05a-410f-818b-e6a5933622c7",
        exercise: {
          exerciseId: "3142047d-943b-4161-855e-18d359d22c62",
          updatedAt: "2023-11-05T13:02:19.881Z",
          createdAt: "2023-11-05T13:02:19.881Z",
          name: "Lat shoulder raise",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "fb44e846-efa6-4be1-8283-3f1eb709c967",
        updatedAt: "2023-11-05T13:04:05.984Z",
        createdAt: "2023-11-05T13:04:05.984Z",
        targetReps: 8,
        targetSets: 3,
        exerciseId: "0070be4a-3821-403c-a6b1-0ad803386d13",
        planId: "7dabc5fe-b05a-410f-818b-e6a5933622c7",
        exercise: {
          exerciseId: "0070be4a-3821-403c-a6b1-0ad803386d13",
          updatedAt: "2023-11-05T13:01:50.550Z",
          createdAt: "2023-11-05T13:01:50.550Z",
          name: "Machine Bench Press",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
    ],
    gymLocation: {
      name: "option 2",
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
    targets: [
      {
        targetId: "3cbe96a8-3aa9-4637-bbb4-067f232b2a95",
        updatedAt: "2023-11-05T13:34:53.703Z",
        createdAt: "2023-11-05T13:34:53.703Z",
        targetReps: 3,
        targetSets: 3,
        exerciseId: "3142047d-943b-4161-855e-18d359d22c62",
        planId: "08c45387-1f30-4d4d-82c4-3fd8d746ec06",
        exercise: {
          exerciseId: "3142047d-943b-4161-855e-18d359d22c62",
          updatedAt: "2023-11-05T13:02:19.881Z",
          createdAt: "2023-11-05T13:02:19.881Z",
          name: "Lat shoulder raise",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "3934c2c9-1575-4c7b-92c8-be7125c4baa2",
        updatedAt: "2023-11-05T13:34:53.703Z",
        createdAt: "2023-11-05T13:34:53.703Z",
        targetReps: 3,
        targetSets: 3,
        exerciseId: "b578dfba-2599-4484-a72a-c7c37a9f0664",
        planId: "08c45387-1f30-4d4d-82c4-3fd8d746ec06",
        exercise: {
          exerciseId: "b578dfba-2599-4484-a72a-c7c37a9f0664",
          updatedAt: "2023-11-05T13:01:57.010Z",
          createdAt: "2023-11-05T13:01:57.010Z",
          name: "DB Bench Press",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "5f94a2e1-76ba-4f03-b149-7dc10d4956ba",
        updatedAt: "2023-11-05T13:34:53.703Z",
        createdAt: "2023-11-05T13:34:53.703Z",
        targetReps: 3,
        targetSets: 3,
        exerciseId: "0070be4a-3821-403c-a6b1-0ad803386d13",
        planId: "08c45387-1f30-4d4d-82c4-3fd8d746ec06",
        exercise: {
          exerciseId: "0070be4a-3821-403c-a6b1-0ad803386d13",
          updatedAt: "2023-11-05T13:01:50.550Z",
          createdAt: "2023-11-05T13:01:50.550Z",
          name: "Machine Bench Press",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
    ],
    gymLocation: {
      name: "apt gym",
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
    targets: [
      {
        targetId: "ffd371ab-7d0d-402d-a53d-15ce481bf58e",
        updatedAt: "2023-11-05T13:35:10.651Z",
        createdAt: "2023-11-05T13:35:10.651Z",
        targetReps: 3,
        targetSets: 3,
        exerciseId: "22b98b2a-a176-4bc1-aa92-b6a911ef0f20",
        planId: "3a615af4-0ead-4637-bd6a-c48f0c292756",
        exercise: {
          exerciseId: "22b98b2a-a176-4bc1-aa92-b6a911ef0f20",
          updatedAt: "2023-11-05T13:02:26.688Z",
          createdAt: "2023-11-05T13:02:26.688Z",
          name: "Machine Shoulder Press",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "ae918479-8aba-44eb-b8d4-1631dd538b30",
        updatedAt: "2023-11-05T13:35:10.652Z",
        createdAt: "2023-11-05T13:35:10.652Z",
        targetReps: 3,
        targetSets: 3,
        exerciseId: "78c1392b-304d-4f4c-ace3-d3b5a94e25ae",
        planId: "3a615af4-0ead-4637-bd6a-c48f0c292756",
        exercise: {
          exerciseId: "78c1392b-304d-4f4c-ace3-d3b5a94e25ae",
          updatedAt: "2023-11-05T13:02:35.456Z",
          createdAt: "2023-11-05T13:02:35.456Z",
          name: "Machine Tricep bar pushdown",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
      {
        targetId: "f9a3bbbb-928a-4ca6-bf05-9fdbdf8ca7bb",
        updatedAt: "2023-11-05T13:35:10.652Z",
        createdAt: "2023-11-05T13:35:10.652Z",
        targetReps: 3,
        targetSets: 13,
        exerciseId: "5fbea3e6-e1aa-4193-9226-dbd1573b8ea0",
        planId: "3a615af4-0ead-4637-bd6a-c48f0c292756",
        exercise: {
          exerciseId: "5fbea3e6-e1aa-4193-9226-dbd1573b8ea0",
          updatedAt: "2023-11-05T13:02:48.494Z",
          createdAt: "2023-11-05T13:02:48.494Z",
          name: "Tricep single arm db raise",
          description: "",
          url: "",
          userId: "ab270ab1-4350-4457-8bde-7fa17ce7b8b7",
        },
      },
    ],
    gymLocation: {
      name: "apt gym",
    },
  },
]
