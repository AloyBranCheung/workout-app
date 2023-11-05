import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
// hooks
import useMutationAddExercise from "src/hooks/useMutationAddExercise"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import useGetGymLocations from "src/hooks/useGetGymLocations"
// types/validators
import AddExerciseSchema from "src/validators/add-exercise-schema"
// components
import FormInput from "../UI/FormInput"
import FormTextarea from "../UI/FormTextarea"
import SecondaryButton from "../UI/SecondaryButton"
import PrimaryButton from "../UI/PrimaryButton"
import LoadingSpinner from "../UI/LoadingSpinner"
import { MenuOption } from "src/types/menu"
import FormSelect from "../UI/FormSelect"
import Units from "src/constants/units"

interface AddExerciseFormProps {
  onClickCancel: () => void
  onSubmitSuccess?: () => void
}

export default function AddExerciseForm({
  onClickCancel,
  onSubmitSuccess,
}: AddExerciseFormProps) {
  const { data, isLoading: isGymLocationsLoading } = useGetGymLocations()
  const toastMessage = useToastMessage()

  const gymLocationsMenuOptions: MenuOption[] = (() => {
    if (!data) return []
    return data.map((gymLocation) => ({
      id: gymLocation.gymId,
      value: gymLocation.gymId,
      name: gymLocation.name,
    }))
  })()

  const { handleSubmit, control, reset } = useForm<
    z.infer<typeof AddExerciseSchema>
  >({
    resolver: zodResolver(AddExerciseSchema),
    defaultValues: {
      name: "",
      description: "",
      url: undefined,
      gymId: "",
      unit: "",
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

  return isGymLocationsLoading ? (
    <LoadingSpinner />
  ) : (
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
        <FormSelect
          control={control}
          name="gymId"
          label="Gym Location"
          instruction="Select a location"
          menuOptions={gymLocationsMenuOptions}
          withAddAnOption={false}
        />
        <FormSelect
          control={control}
          name="unit"
          label="Unit"
          instruction="Select a unit"
          menuOptions={Object.values(Units).map((unit) => ({
            id: unit,
            name: unit,
            value: unit,
          }))}
          withAddAnOption={false}
        />
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
