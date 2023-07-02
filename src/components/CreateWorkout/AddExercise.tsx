import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// components
import Text from "../UI/typography/Text"
import PrimaryButton from "../UI/PrimaryButton"
import SecondaryButton from "../UI/SecondaryButton"
import BorderCard from "../UI/BorderCard"
import SecondaryCard from "../UI/SecondaryCard"
// types/utils
import { GetExercisesOutput } from "src/types/trpc/router-types"
import AddExerciseForm from "../Exercises/AddExerciseForm"

interface AddExerciseProps {
  onClickCancel: () => void
  onClickAdd: (exerciseId: string) => void
  exercises: GetExercisesOutput
}

export default function AddExercise({
  onClickCancel,
  exercises,
  onClickAdd,
}: AddExerciseProps) {
  const [createNewExercise, setCreateNewExercise] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      {createNewExercise ? (
        <AddExerciseForm
          onClickCancel={() => setCreateNewExercise(false)}
          onSubmitSuccess={() => setCreateNewExercise(false)}
        />
      ) : (
        <SecondaryButton
          label="Create new exercise"
          type="button"
          onClick={() => setCreateNewExercise(true)}
          className="w-full"
        />
      )}
      <BorderCard>
        <Text className="text-p2" bold text="My Exercises" />
        <div className="flex flex-col gap-4">
          {exercises.length > 0 ? (
            exercises.map(({ exerciseId, name }) => (
              <AnimatePresence key={exerciseId}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SecondaryCard
                    key={exerciseId}
                    className="flex items-center justify-between"
                  >
                    <Text text={name} />
                    <PrimaryButton
                      label="Add"
                      type="button"
                      className="p-2 py-0"
                      onClick={() => onClickAdd(exerciseId)}
                    />
                  </SecondaryCard>
                </motion.div>
              </AnimatePresence>
            ))
          ) : (
            <Text
              className="text-center"
              text="Start by creating an exercise :)"
            />
          )}
        </div>
      </BorderCard>
      <SecondaryButton label="Close" type="button" onClick={onClickCancel} />
    </div>
  )
}
