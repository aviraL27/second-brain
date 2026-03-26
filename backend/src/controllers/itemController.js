const Item = require("../models/Item");

const getItems = async (req, res) => {
    try {
        const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const createItem = async (req, res) => {
    try {
        const { title, type, content, tags } = req.body;
        if (!title || !type || !content) {
            return res.status(400).json({ message: "Please provide title, type, and content" });
        }

        const item = await Item.create({
            title,
            type,
            content,
            tags,
            user: req.user._id
        });

        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Invalid item data format" });
    }
};

const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "User not authorized to delete this item" });
        }
        await item.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const searchItems = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        if (!searchQuery) {
            return res.status(400).json({ message: "Please provide a search term" });
        }
        const items = await Item.find({
            user: req.user._id,
            $text: { $search: searchQuery }
        }).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getItems, createItem, deleteItem, searchItems };