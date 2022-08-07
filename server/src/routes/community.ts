import { Request, Response } from 'express'
import { Game } from '../entities/Community'

export const getGames = async (_: Request, res: Response) => res.json(await Game.find({}).select("name").select("guid"))
