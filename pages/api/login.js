import dbConnect from '../../lib/connectDB';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) { 
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();
    
        const email = req.body.email;
        const password = req.body.password;
    
        User.findOne({email: email})
            .then(user => {
                if(!user) {
                    res.send(-1);
                } else {
                    bcrypt
                        .compare(password, user.pass)
                        .then(match => {
                            if (match) {
                                res.send(1);
                            } else {
                                res.send(-2);
                            }
                        })
                }
            })
    }
}
    