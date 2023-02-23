import Card from "../models/Card.js";
import List from "../models/List.js";

export const createCard = async (req, res) => {
    try {
        const newCard = new Card({
            section: req.body.list,
            title: req.body.title,
        })
        const card = await newCard.save()
        await List.updateOne({
            _id: req.body.list
        }, {
            $addToSet: {cards: card._id}
        })
        return res.status(200).json({message: 'success'})
    } catch (err) {
        return res.status(500).json('card creation failed')
    }
}

export const updateCard = async (req, res) => {
    try {
        await Card.updateOne({_id: req.body.id}, {
            section: req.body.destinationId
        })
        await List.updateOne({_id: req.body.destinationId}, {
            $addToSet: {cards: req.body.id}
        })
        await List.updateOne({_id: req.body.sourceId}, {
            $pull: {cards: req.body.id}
        })
        return res.status(200).json({message: 'success'})
    } catch (err) {
        return res.status(500).json('card update failed')
    }
}

export const createList = async (req, res) => {
    try {
        const list = new List({
            title: req.body.title ? req.body.title : 'Untitled',
        })
        await list.save()
        return res.status(200).json({message: 'success'})
    } catch (err) {
        return res.status(500).json('list creation failed')
    }
}

export const deleteList = async (req, res) => {
    try {
        await Card.deleteMany({ section: req.params.id })
        await List.deleteOne({ _id: req.params.id })
        return res.status(200).json({message: 'success'})
    } catch (err) {
        return res.status(500).json('list deletion failed')
    }
}

export const emptyList = async (req, res) => {
    try {
        await Card.deleteMany({ section: req.params.id })
        await List.updateOne({ _id: req.params.id }, {$set: {cards: []}})
        return res.status(200).json({message: 'success'})
    } catch (err) {
        return res.status(500).json('failed to empty the list')
    }
}

export const deleteCard = async (req, res) => {
    try {
        const card = await Card.findOne({ _id: req.params.id })
        await List.updateOne({ _id: card.section }, {
            $pull: {cards: req.params.id }
        })
        await Card.deleteOne({ _id: req.params.id })
        return res.status(200).json({message: 'success'})
    } catch (err) {
        return res.status(500).json('card deletion failed')
    }
}

export const getLists = async (req, res) => {
    try {
        const lists = await List.find().populate('cards')
        return res.status(200).json([...lists])
    } catch (err) {
        return res.status(500).json('failed to get lists')
    }
}

