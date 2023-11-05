import { trouter } from "../trpc"
// procedures
import addGymLocation from "../procedures/gym-location-procedures/add-gym-location"
import getGymLocations from "../procedures/gym-location-procedures/get-gym-location"
import deleteGymLocation from "../procedures/gym-location-procedures/delete-gym-location"
import getLocationById from "../procedures/gym-location-procedures/get-location-by-id"
import updateGymLocationById from "../procedures/gym-location-procedures/update-gym-locaion-by-id"

const gymLocationRouter = trouter({
  addGymLocation,
  getGymLocations,
  deleteGymLocation,
  getLocationById,
  updateGymLocationById,
})

export default gymLocationRouter
