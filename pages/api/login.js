import dbConnect from '../../lib/connectDB';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute ( 
    async (req, res) => { 
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' });
            return
        } else {
            await dbConnect();
        
            const email = req.body.email;
            const password = req.body.password;
        
            await User.findOne({email: email})
                .then(user => {
                    if(!user) {
                        res.send(-1);                    
                    } else {
                        bcrypt
                            .compare(password, user.pass)
                            .then(async match => {
                                if (match) {
                                    req.session.userId = user._id.toString();
                                    req.session.userEmail = email;
                                    req.session.userName = `${user.f_name} ${user.l_name}`;
                                    req.session.isLoggedIn = true;
                                    req.session.clearance = user.clearance;
                                    await req.session.save();
                                    res.send(1)   
                                    console.log(req.session);                                
                                } else {
                                    res.send(-1);
                                }
                            })
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
    