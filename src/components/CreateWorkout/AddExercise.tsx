import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// zod
import { z } from "zod"
// hooks
import useMutationAddExercise from "src/hooks/useMutationAddExercise"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import { AnimatePresence, motion } from "framer-motion"
// components
import Text from "../UI/typography/Text"
import FormInput from "../UI/FormInput"
import PrimaryButton from "../UI/PrimaryButton"
import SecondaryButton from "../UI/SecondaryButton"
import FormTextarea from "../UI/FormTextarea"
import BorderCard from "../UI/BorderCard"
import SecondaryCard from "../UI/SecondaryCard"
// types/utils
import AddExerciseSchema from "src/validators/add-exercise-schema"
import { GetExercisesOutput } from "src/types/trpc/router-types"

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
  const toastMessage = useToastMessage()
  const { handleSubmit, control, reset } = useForm<
    z.infer<typeof AddExerciseSchema>
  >({
    resolver: zodResolver(AddExerciseSchema),
    defaultValues: {
      name: "",
      description: "",
      url: undefined,
    },
  })
  const { mutate, isLoading } = useMutationAddExercise(
    // onSuccess
    () => {
      reset()
      setCreateNewExercise(false)
      toastMessage("Successfully added exercise.", ToastMessage.Success)
    },
    // onError
    () => {
      toastMessage("Error adding exercise.", ToastMessage.Error)
    }
  )

  const handleSubmitForm = (data: z.infer<typeof AddExerciseSchema>) => {
    mutate(data)
  }

  return (
    <div className="flex flex-col gap-4">
      {createNewExercise ? (
        <AnimatePresence>
          <motion.form
            initial={{ scaleY: 0, opacity: 0.3 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col justify-center gap-2"
          >
            <FormInput control={control} name="name" required />
            <FormInput control={control} name="url" required={false} />
            <FormTextarea
              control={control}
              name="description"
              label="Description:"
            />
            <div className="flex justify-end gap-2">
              <SecondaryButton
                label="Cancel"
                type="button"
                onClick={() => setCreateNewExercise(false)}
                className="py-2 px-3"
              />
              <PrimaryButton
                label="Submit"
                type="submit"
                className="py-2 px-3"
                isLoading={isLoading}
              />
            </div>
          </motion.form>
        </AnimatePresence>
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
