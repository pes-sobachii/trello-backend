import mongoose from 'mongoose'

const ListSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: ''
        },
        cards: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card'
        }],
    },
    {
        timestamps: true,
    }
)
export default mongoose.model('List', ListSchema)
