import React, { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// hooks
import useGetGymLocationById from "src/hooks/useGetGymLocationById"
import useMutationUpdateGymLocationById from "src/hooks/useMutationUpdateGymLocationById"
// components
import LoadingSpinner from "../UI/LoadingSpinner"
import FormInput from "../UI/FormInput"
import YesNoBtnGroup from "../UI/YesNoBtnGroup"
import { UpdateGymLocationSchema } from "src/validators/gym-location-schema"

type UpdateGymLocationType = z.infer<typeof UpdateGymLocationSchema>

interface EditGymLocationModalProps {
  editGymId: string
  onClickDecline: () => void
}

export default function EditGymLocationModal({
  editGymId,
  onClickDecline,
}: EditGymLocationModalProps) {
  const { data, isLoading } = useGetGymLocationById(editGymId)
  const { mutate, isLoading: isMutating } = useMutationUpdateGymLocationById()
  const { control, handleSubmit, setValue, reset } =
    useForm<UpdateGymLocationType>({
      defaultValues: {
        name: "",
        description: "",
        gymId: "",
      },
      resolver: zodResolver(UpdateGymLocationSchema),
    })

  const handleSubmitForm = async (data: UpdateGymLocationType) => {
    mutate(data)
    reset()
    onClickDecline()
  }

  useEffect(() => {
    if (data) {
      setValue("description", data?.description ? data.description : "")
      setValue("gymId", data.gymId)
      setValue("name", data.name)
    }
  }, [data, setValue])

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-2 justify-center"
    >
      <FormInput control={control} name="name" />
      <FormInput control={control} name="description" />
      <YesNoBtnGroup
        confirmText="Update"
        confirmBtnType="submit"
        declineText="Cancel"
        declineBtnType="button"
        onClickDecline={onClickDecline}
        isLoading={isMutating}
      />
    </form>
  )
}
