import dbConnect from '../../lib/connectDB';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

const crypto = require('crypto');

import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

export default async function handler(req, res) {
    const transporter = nodemailer.createTransport(
        sendgridTransport({
              auth: {
                api_key: process.env.SENDGRID_API
              }
        })
    );

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();

        const password = req.body.password;
        const email = req.body.email;

        await User.findOne({email: email})
                .then(user => {
                    if(!user) {
                        res.send(-1);
                    } else {
                        bcrypt
                        .hash(password, 12)
                        .then(hashedPassword => {
                            user.pass = hashedPassword;
                            user.resetToken = "";
                            user.resetTokenExpiration = ""
                            user.save();
                            res.send(1);
                        })
                    }
                })
    }
}
            