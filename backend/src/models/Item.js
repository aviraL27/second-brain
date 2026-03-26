const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Item title is required"],
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ["note", "link", "code"],
        default: "note"
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    tags: {
        type: [String],
    }
}, {
    timestamps: true
});

itemSchema.index({
    title: "text",
    content: "text",
    tags: "text"
});

module.exports = mongoose.model("Item", itemSchema);
