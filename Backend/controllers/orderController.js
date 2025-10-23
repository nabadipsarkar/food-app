import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing the user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://food-app-frontend-81rl.onrender.com"
    try {
        const newOrder = new orderModel({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });
        //this line items is nessesary for this stripe payment --> 100%
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))
        // delivery charges added into 
        line_items.push({
            price_data: {
                currency: "inr",
                product_data:{
                    name:"delivery charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url});

    } catch (error) {
        console.log(error);
        res.json({success:false, massage:"error"})
    }
}
const verifyOrder = async (req, res)=>{
    try {
        const {success, orderId} = req.body;
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:"true"});
            res.json({success:true, message:"Paid"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"});
    }
}

// function for fetch all orders of user
const userOrders = async (req, res)=>{
    try {
        const orders = await orderModel.find({userId:req.user.id})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"})
    }
}

// fetch all order to admin page
const listOrders = async (req, res)=>{
    try {
        const allOrders = await orderModel.find({});
        res.json({success:true, data:allOrders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// change the status of order
const changeStatus = async(req, res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true, message:"Status changed"})
    } catch (error) {
       console.log(error);
       res.json({success:false, message:"error"}) 
    }
}
//completion and delete the order  from database
const delOrder = async(req,res)=>{
    try {
        await orderModel.findByIdAndDelete(req.body.orderId);
        res.json({success:true, message:"Order delivered"})
    } catch (error) {
        console.log(error);
       res.json({success:false, message:"error"}) 
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, changeStatus,delOrder };
