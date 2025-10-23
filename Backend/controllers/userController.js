import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" })
        }

        const token = createToket(user._id);
        res.json({ success: true, token})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }

}

const createToket = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
//user register
const registerUser = async (req, res) => {

    const { name, password, email } = req.body;
    try {
        //check the user already exist or not
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exist" })
        }

        // validate the email format and string password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter strong password" })
        }

        // encrypt the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPass
        })

        const user = await newUser.save();
        const token = createToket(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" });
    }


}

export { loginUser, registerUser }