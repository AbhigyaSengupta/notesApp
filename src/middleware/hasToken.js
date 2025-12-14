import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js";

export const hasToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Access token is missing or invalid",
            });
        } else {
            const token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.secretKey, async (err, decoded) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return res.status(400).json({
                            success: false,
                            message:
                                "Access token has expired, use refreshToken to generate again",
                        });
                    } else
                        return res.status(400).json({
                            success: false,
                            message: "Access token is missing or invalid",
                        });
                } else {
                    const { id } = decoded;
                    const user = await userSchema.findById(id);
                    console.log(user, decoded);
                    
                    if (!user) {
                        return res.status(404).json({
                            success: false,
                            message: "user not found",
                        });
                    }
                    // req.userId = id;
                    // next();
                    const exsistUser = await sessionSchema.findOne({
                        userId : id
                    })

                    if(exsistUser) {
                        req.userId = id
                        next()
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Could not access",
        });
    }
};

// import jwt from "jsonwebtoken";
// import userSchema from "../models/userSchema.js";

// export const hasToken = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer")) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Access token is missing or invalid",
//             });
//         }

//         const token = authHeader.split(" ")[1];

//         jwt.verify(token, process.env.secretKey, async (err, decoded) => {
//             if (err) {
//                 // Handle Token Expiration specifically
//                 if (err.name === "TokenExpiredError") {
//                     return res.status(400).json({
//                         success: false,
//                         message: "Access token has expired, use refreshToken to generate again",
//                     });
//                 } else {
//                     return res.status(403).json({
//                         success: false,
//                         message: "Invalid Token",
//                     });
//                 }
//             } else {
//                 // --- FIX STARTS HERE ---
                
//                 // 1. Robust Extraction: Handle both 'id' and '_id' cases
//                 const tokenId = decoded.id || decoded._id;

//                 if (!tokenId) {
//                      return res.status(403).json({
//                         success: false,
//                         message: "Token payload is invalid (missing ID)",
//                     });
//                 }

//                 // 2. Database Lookup
//                 const user = await userSchema.findById(tokenId);

//                 if (!user) {
//                     return res.status(404).json({
//                         success: false,
//                         message: "User not found",
//                     });
//                 }

//                 // 3. Assignment: Use the REAL _id from the database
//                 // This ensures it is a valid ObjectId, not just a string
//                 req.userId = user._id;

//                 next();
//                 // --- FIX ENDS HERE ---
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error during auth",
//         });
//     }
// };