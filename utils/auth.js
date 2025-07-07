const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.JWT_SECRET || 'alumniSecret';

exports.hashPassword = async (plain) => await bcrypt.hash(plain, 10);
exports.comparePassword = async (plain, hash) => await bcrypt.compare(plain, hash);

exports.generateToken = (user) => {
    return jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d'} );
};

exports.authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized'});

    try{
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json( { error: 'Invalid token' });
    }
};