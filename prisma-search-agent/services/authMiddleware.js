import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming the token is passed in the Authorization header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const tokenWithoutBearer = token.split(" ")[1];
  jwt.verify(tokenWithoutBearer, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
};

export { verifyToken };
