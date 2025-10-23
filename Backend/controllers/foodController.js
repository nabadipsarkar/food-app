import foodModel from "../models/foodModel.js";
import fs from "fs";

//Add food item in the database and image in folder
const addFood = async (req, res)=>{
    // Check if file exists
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    let image_filename = `${req.file.filename}`;

    const food  = new foodModel({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        rating:req.body.rating,
        image:image_filename
    });

    try {
        await food.save();
        res.json({success:true,message:"Food Added"});
    } catch (error) {
        console.log(error);
        res.json({success:fale,message:"Error"});
    }
}

// All food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Delete food from database
const removeFood = async(req,res)=>{
    try {
        // find the food by id and delete the image using fs
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"});      
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addFood,listFood,removeFood};