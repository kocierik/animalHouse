
import Service from '../entities/Service';
import JsonError from '../json/JsonError'
import {JsonService} from '../json/JsonService';


export const findAllService = async (): Promise<JsonService[]> => {
  try {
    const services = (await Service.find({})) 
    return services
  } catch (err) {
    throw new JsonError(`Cannot find services (${err.message})`)
  }
}