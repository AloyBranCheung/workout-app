import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
// hooks
import useMutationUpdateExercise from "src/hooks/useMutationUpdateExercise"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
// types/utils
import { GetExercisesOutput } from "src/types/trpc/router-types"
import UpdateExerciseSchema from "src/validators/update-exercise-schema"
// components
import FormInput from "../UI/FormInput"
import FormTextarea from "../UI/FormTextarea"
import YesNoBtnGroup from "../UI/YesNoBtnGroup"

interface EditExerciseProps {
  exercise: GetExercisesOutput[number]
  onClose: () => void
}

export default function EditExercise({ exercise, onClose }: EditExerciseProps) {
  const toastMessage = useToastMessage()
  const { control, handleSubmit } = useForm<
    z.infer<typeof UpdateExerciseSchema>
  >({
    resolver: zodResolver(UpdateExerciseSchema),
    defaultValues:
      typeof exercise.url === "string"
        ? {
            ...exercise,
            url: exercise.url.length > 0 ? exercise.url : undefined,
          }
        : exercise,
  })
  const { mutate } = useMutationUpdateExercise(
    () => {
      toastMessage("Successfully updated exercise.", ToastMessage.Success)
      onClose()
    },
    () => {
      toastMessage("Failed to update exercise.", ToastMessage.Error)
    }
  )
  const handleSubmitForm = (data: z.infer<typeof UpdateExerciseSchema>) =>
    mutate(data)

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-2"
    >
      <FormInput control={control} name="name" />
      <FormInput control={control} name="url" required={false} />
      <FormTextarea control={control} name="description" />
      <YesNoBtnGroup
        confirmText="Submit"
        confirmBtnType="submit"
        declineText="Cancel"
        declineBtnType="button"
        onClickDecline={onClose}
      />
    </form>
  )
}
