import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";


export const checkout = async (req, res)=>{

    const option = {
        amount: Number(req.body.amt*100),
        currency: "INR",
    };
    const order = await instance.orders.create(option);

    // console.log(order);
    res.status(200).json({
        success: true,
        order,
    });
}

export const paymentVarification = async (req, res)=>{

    console.log(req?.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req?.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");
    
    const isAuthentic = generated_signature === razorpay_signature;

    if(isAuthentic){
        // DataBase

        await Payment.create({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature ,
        });

        res.redirect(`http://localhost:3000/payment_success?reference=${razorpay_payment_id}`);
    }
    else{
        res.status(200).json({
            success: false,
        });
    }
}