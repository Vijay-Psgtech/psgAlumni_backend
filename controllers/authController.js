const User = require('../models/userModel');
const { comparePassword, generateToken, authMiddleWare, hashPassword} = require('../utils/auth');

exports.login = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({message:'User not found'});

        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) return res.status(404).json({ message: 'Invalid Password' });

        const token = generateToken(user);
        res.json({
            message:'Login successful',
            token,
            user : {
                id: user._id,
                name: user.first_name,
                email: user.email,
                role: user.role,
            }
        });
    }catch(err){
        res.status(500).json({ error: 'Login Failed'});
    }
};

exports.register = async(req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try{
        const exists = await User.findOne({ email });
        if(exists) return res.status(400).json({ message: 'Email already exists'});

        const hashed = await hashPassword(password);
        const user = await User.create({ first_name, last_name, email, password: hashed });
        res.json({ message: 'Registered Sucessfully'}); 
    }catch(err){
        res.status(500).json({ error: 'Registration Failed'});
    }
}
