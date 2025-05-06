// // //Modifying headers for all pages or a subset of pages
// import jwt from 'jsonwebtoken'
// import next, { NextApiRequest, NextApiResponse } from 'next';
// // import next from 'next';

// export function authUser(req: NextApiRequest, res: NextApiResponse){


//     try {
//         const { token } = req.headers
//         if (!token) {
//             return { success: false, message: "Not Authorized. Please login again." };
//         }
//         //to verify this token we have to decode this token 
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET!);

//         // Check if the decoded email matches the admin's email
//         req.body.userId = token_decode.userid

//         next(); //this's like a "continue" button in Express middleware:
//     }
//     catch (error) {
//         console.log(error);
//     }
// }