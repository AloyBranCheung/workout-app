import React from "react"
// react-hook-forms
import { useForm } from "react-hook-form"
// components
import Text from "../UI/typography/Text"
import ParentCard from "../UI/ParentCard"
import FormInput from "../UI/FormInput"
import PrimaryButton from "../UI/PrimaryButton"
import SecondaryButton from "../UI/SecondaryButton"

export default function CreateWorkout() {
  const { handleSubmit, reset, control } = useForm()

  const handleSubmitForm = (formData) => console.log("formdata", formData)

  return (
    <div className="flex flex-col justify-center gap-5">
      <Text text="Create a Workout Plan" className="text-p1" />
      <ParentCard>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-6 justify-center"
        >
          <div>
            <FormInput control={control} name="name" />
          </div>
          <SecondaryButton label="Add Exercise" type="button" />
          <div className="flex items-center justify-end gap-3">
            <SecondaryButton
              label="Cancel"
              type="button"
              className="py-2 px-3"
            />
            <PrimaryButton label="Submit" type="submit" className="py-2 px-3" />
          </div>
        </form>
      </ParentCard>
    </div>
  )
}
