import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import useMutationAddExercise from "src/hooks/useMutationAddExercise"
import { useForm } from "react-hook-form"
import AddExerciseSchema from "src/validators/add-exercise-schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import FormInput from "../UI/FormInput"
import FormTextarea from "../UI/FormTextarea"
import SecondaryButton from "../UI/SecondaryButton"
import PrimaryButton from "../UI/PrimaryButton"

interface AddExerciseFormProps {
  onClickCancel: () => void
  onSubmitSuccess?: () => void
}

export default function AddExerciseForm({
  onClickCancel,
  onSubmitSuccess,
}: AddExerciseFormProps) {
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
      toastMessage("Successfully added exercise.", ToastMessage.Success)
      if (!onSubmitSuccess) return
      onSubmitSuccess()
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
      </motion.form>
    </AnimatePresence>
  )
}
