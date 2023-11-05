import React from "react"
// react-hook-forms
import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// z
import { z } from "zod"
// types/validators
import { AddGymLocationSchema } from "src/validators/workout-schema"
import FormInput from "../UI/FormInput"
import PrimaryButton from "../UI/PrimaryButton"
// hooks
import useMutationAddGymLocation from "src/hooks/useMutationAddGymLocation"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"

interface AddGymLocationModalProps {
  // trigger setValues in the parent form for the new location from getValues().name in this form
  onSuccessAdd: (gymName: string) => void
}

export default function AddGymLocationModal({
  onSuccessAdd,
}: AddGymLocationModalProps) {
  const toastMessage = useToastMessage()

  const { handleSubmit, reset, control } = useForm<
    z.infer<typeof AddGymLocationSchema> & FieldValues
  >({
    defaultValues: {
      description: "",
      name: "",
    },
    resolver: zodResolver(AddGymLocationSchema),
  })

  const { mutate, isLoading } = useMutationAddGymLocation(
    (data) => {
      toastMessage("Successfully added gym location.", ToastMessage.Success)
      onSuccessAdd(data.gymId)
      reset()
    },
    () => toastMessage("Error adding gym location.", ToastMessage.Error)
  )

  const handleSubmitForm = (data: z.infer<typeof AddGymLocationSchema>) => {
    mutate(data)
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <FormInput control={control} name="name" />
      <FormInput control={control} name="description" required={false} />
      <PrimaryButton
        label="Submit"
        type="submit"
        className="py-2 px-3 mt-5"
        isLoading={isLoading}
      />
    </form>
  )
}
