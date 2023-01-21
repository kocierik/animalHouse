import { JsonNotFoundError } from '../json/JsonError'
import type { ILocation } from '../entities/Location'
import Location from '../entities/Location'
import { LocationPatch } from '@/json/patch/LocationPatch'
import { JsonLocation, JsonLocationCreation } from '@/json/JsonLocation'

export const getAllLocation = async (): Promise<ILocation[]> => {
  try {
    const location = await Location.find({})
    return location
  } catch (err) {
    throw new JsonNotFoundError(`Cannot find location (${err.message})`)
  }
}

export const getLocationById = async (id: string): Promise<ILocation> => {
  try {
    const location = await Location.findById(id)
    return location
  } catch (err) {
    throw new JsonNotFoundError(`Cannot find location (${err.message})`)
  }
}

export const patchLocation = async (id: string, patch: LocationPatch): Promise<ILocation> => {
  const location = await Location.findById(id)
  if (!location) {
    throw new JsonNotFoundError(`Cannot find location with id ${id}`)
  }
  if (patch.name) location.name = patch.name
  if (patch.latitude) location.latitude = patch.latitude
  if (patch.longitude) location.longitude = patch.longitude
  if (patch.zip) location.address.zip = patch.zip
  if (patch.country) location.address.country = patch.country
  if (patch.city) location.address.city = patch.city
  if (patch.street) location.address.street = patch.street
  await location.save()
  return location as ILocation
}

export const deleteLocation = async (id: string): Promise<boolean> => {
  const location = await Location.findById(id)
  if (!location) {
    throw new JsonNotFoundError(`Cannot find location with id ${id}`)
  }
  if (await Location.deleteOne({ _id: id })) return true
  return false
}

export const createLocation = async (creation: JsonLocationCreation): Promise<JsonLocation> => {
  const location = new Location()
  location.name = creation.name
  location.address = creation.address

  if (creation.longitude) location.longitude = creation.longitude

  if (creation.latitude) location.latitude = creation.latitude

  return (await location.save()) as ILocation
}
