import dbConnect from '../../lib/connectDB';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

import { withIronSessionApiRoute } from 'iron-session/next'
import { resolveContent } from 'nodemailer/lib/shared';

export default withIronSessionApiRoute ( 
    async (req, res) => { 
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' });
            return
        } else {
            await dbConnect();
        
            const email = req.body.email;
            const password = req.body.password;

            let isVerified = false;
        
            await User.findOne({email: email})
                .then(user => {
                    if(!user) {
                        return isVerified = false;                       
                    } else {
                        bcrypt
                            .compare(password, user.pass)
                            .then(match => {
                                if (match) {
                                    console.log("Verified");
                                    return isVerified = true;                                   
                                } 
                            })
                            .then(
                                async response => {
                                    if (isVerified) {
                                        console.log("Verified 2")
                                        req.session.userEmail = email;
                                        req.session.userName = `${user.f_name} ${user.l_name}`;
                                        req.session.isLoggedIn = true;
                                        await req.session.save();
                                        res.send(1)
                                    } else {
                                        console.log("Unauthenticated")
                                        res.send(-1);
                                    }
                                }
                            )
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    {
        cookieName: "CODEXAPPCOOKIE",
        cookieOptions : {
            secure: process.env.NODE_ENV === "production"
        },
        password: process.env.SESSION_PASS
    }
)
    