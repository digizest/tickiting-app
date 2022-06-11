const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler')
require('dotenv').config();



const signUp = async (req, res) => {
    //   console.log(req.body);
    const { name, email, password } = req.body;
  
    //Validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please include all fields.");
    }
  
    //Find the user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    //create user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    })
    user.save()
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  };

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
  
    const user = await userModel.findOne({ email });
    // console.log(password, user.password);

    const ComparePass = await bcrypt.compare(password, user.password)
    
    // check user & password match
    if (user && ComparePass) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  };

  // Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

module.exports = {signUp, loginUser}


// const signUp = (req ,res )=>{
//     // let userName = req.body.name
//     // let userEmail = req.body.email
//     // let userDepartment = req.body.department
//     // let userDesignation = req.body.designation
//     // let userEmp_code = req.body.emp_code 
//     // let userPassword = req.body.encry_password
//     let user = new userModel(req.body)
//     console.log(user)

//     // {name : userName ,email:userEmail , department:userDepartment , designation :userDesignation ,emp_code : userEmp_code ,encry_password  : userPassword}
//     // console.log(req.body)

//     user.save((err, user)=>{
//         if(err){
//             return res.status(400).json({msg : "unable to create user" , error : err})
//         }else{
//              res.json(user)
//         }
//     })
// };

// const signin = (req,res) => {
//     const {email , password} = req.body;
//     console.log(req.body)

//    userModel.findOne({email},(err , data)=>{
//        console.log("find chala")
// if(err){
//    return res.status(400).json({
//        msg:"unable to find user",
//        err : err
//    })
// }else{
//     console.log("data mila")
//     return res.status(200).json(data)
// }
//     });
   

      
// }