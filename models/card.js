import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema(
	{
		section: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'List',
			required: true
		},
		title: {
			type: String,
			default: ''
		}
	},
	{
		timestamps: true,
	}
)
export default mongoose.model('Card', CardSchema)