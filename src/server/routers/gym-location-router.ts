import { trouter } from "../trpc"
// procedures
import addGymLocation from "../procedures/gym-location-procedures/add-gym-location"
import getGymLocations from "../procedures/gym-location-procedures/get-gym-location"
import deleteGymLocation from "../procedures/gym-location-procedures/delete-gym-location"

const gymLocationRouter = trouter({
  addGymLocation,
  getGymLocations,
  deleteGymLocation,
})

export default gymLocationRouter
