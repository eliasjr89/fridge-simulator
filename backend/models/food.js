import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    expirationDate: {type: Date, required: true},
    quantity: {type: Number, required: true},
    imageUrl: {type: String},
}, {timestamps: true});

const Food = mongoose.model("Food", foodSchema);

export default Food;