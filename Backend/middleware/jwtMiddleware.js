const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }); 
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  console.log(800,req.headers)
  const token=authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  req.user = decoded;
  next();
};

module.exports = { generateToken, verifyToken, authMiddleware };
