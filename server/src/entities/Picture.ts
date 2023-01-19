import { model, Schema } from "mongoose"

export interface IPicture {
    filename: string
    mimetype?: string
    size?: number
}

export const picturesSchema = new Schema<IPicture>({
    size: { type: Number, required: false },
    filename: { type: String, required: true },
    mimetype: { type: String, required: false },
})

const Picture = model<IPicture>('Picture', picturesSchema)


export default Picture
