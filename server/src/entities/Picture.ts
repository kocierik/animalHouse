import { model, Schema } from "mongoose"

export interface IPicture {
    filename: string
    mimetype: string
    size: number
}

export const picturesSchema = new Schema<IPicture>({
    size: { type: Number, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
})

const Picture = model<IPicture>('Picture', picturesSchema)


export default Picture
