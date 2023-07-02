import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// zod
import { z } from "zod"
// hooks
import useMutationAddExercise from "src/hooks/useMutationAddExercise"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
// components
import FormInput from "../UI/FormInput"
import PrimaryButton from "../UI/PrimaryButton"
import SecondaryButton from "../UI/SecondaryButton"
import FormTextarea from "../UI/FormTextarea"
// types/utils
import AddExerciseSchema from "src/validators/add-exercise-schema"

interface AddExerciseProps {
  onClickCancel: () => void
}

export default function AddExercise({ onClickCancel }: AddExerciseProps) {
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
      onClickCancel()
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
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col justify-center gap-2"
    >
      <FormInput control={control} name="name" required />
      <FormInput control={control} name="url" required={false} />
      <FormTextarea control={control} name="description" label="Description:" />
      <div className="flex justify-end gap-2">
        <SecondaryButton
          label="Cancel"
          type="button"
          onClick={onClickCancel}
          className="py-2 px-3"
        />
        <PrimaryButton
          label="Submit"
          type="submit"
          className="py-2 px-3"
          isLoading={isLoading}
        />
      </div>
    </form>
  )
}
