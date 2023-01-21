import * as Const from '../const'
import { Request, Response } from 'express'
import JsonError from '../json/JsonError'
import * as LocationService from '../services/location-service'
import { LocationPatch } from '@/json/patch/LocationPatch'
import { JsonLocationCreation } from '@/json/JsonLocation'

/**
 * @swagger
 * /locations:
 *   get:
 *     tags:
 *     - locations
 *     summary: get all locations
 *     responses:
 *       200:
 *         description: get location
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Location"
 * */
export const getLocations = async (_: Request, res: Response) => {
  try {
    return res.status(Const.STATUS_OK).json(await LocationService.getAllLocation())
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(ex.code).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     tags:
 *     - locations
 *     summary: get a location
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: Id of the location
 *     responses:
 *       200:
 *         description: get location
 *         schema:
 *           type: object
 *           items:
 *             $ref: "#/components/schemas/Location"
 * */
export const getLocationById = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id
    return res.status(Const.STATUS_OK).json(await LocationService.getLocationById(locationId))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(Const.STATUS_BAD_REQUEST).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 *  /location/{id}: {
 *   patch: {
 *     tags: [ "locations" ],
 *     summary: "patch a location",
 *     parameters: [
 *       {
 *         in: "path",
 *         name: "id",
 *         type: "string",
 *         required: "string",
 *         description: "id of the location"
 *       },
 *       {
 *         in: body,
 *         schema: {
 *           $ref: "#/components/schemas/LocationPatch"
 *         }
 *       }
 *     ],
 *     responses: {
 *       200: {
 *           schema: {
 *             type: "object",
 *             items: {
 *               $ref: "#/components/schemas/Location"
 *             }
 *           }
 *       }
 *     }
 *   }
 *  }
 * */
export const patchLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id
    const patch = req.body as LocationPatch
    return res.status(Const.STATUS_OK).json(await LocationService.patchLocation(locationId, patch))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(ex.code).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 *  /location/{id}: {
 *   delete: {
 *     tags: [ "locations" ],
 *     summary: "delete a location",
 *     parameters: [
 *       {
 *         in: "path",
 *         name: "id",
 *         type: "string",
 *         required: "string",
 *         description: "id of the location"
 *       },
 *     ],
 *     responses: {
 *       204: {
 *       }
 *     }
 *   }
 *  }
 * */
export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id
    return res.status(Const.STATUS_OK).json(await LocationService.deleteLocation(locationId))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(ex.code).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}

/**
 * @swagger
 *  /location/{id}: {
 *   post: {
 *     tags: [ "locations" ],
 *     summary: "create a location",
 *     parameters: [
 *       {
 *         in: "path",
 *         name: "id",
 *         type: "string",
 *         required: "string",
 *         description: "id of the location"
 *       },
 *       {
 *         in: body,
 *         schema: {
 *           $ref: "#/components/schemas/LocationCreation"
 *         }
 *       }
 *     ],
 *     responses: {
 *       200: {
 *           schema: {
 *             type: "object",
 *             items: {
 *               $ref: "#/components/schemas/Location"
 *             }
 *           }
 *       }
 *     }
 *   }
 *  }
 * */
export const postLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id
    const creation = req.body as JsonLocationCreation
    return res.status(Const.STATUS_OK).json(await LocationService.createLocation(locationId, creation))
  } catch (ex) {
    if (ex instanceof JsonError) return res.status(ex.code).json(ex)
    else return res.status(Const.STATUS_BAD_REQUEST).json(new JsonError(ex.message))
  }
}
