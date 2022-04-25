import dbConnect from '../../lib/connectDB';
import User from '../../models/user';
import Post from '../../models/post';
import Project from '../../models/project';
import { withIronSessionApiRoute } from "iron-session/next";

import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

export default withIronSessionApiRoute(
    async (req, res) => {
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
        } else {
            const email = req.body.userEmail;

            const user = await User.findOne({email: email});
            const projects = user.projects;
            for(const project of projects) {
                const projData = await Project.findById(project._id);
                for(const post of projData.posts) {
                    await Post.findByIdAndDelete(post.postId);
                }
                await Project.findByIdAndDelete(project._id);
            }
            await User.findByIdAndDelete(user._id);
            await req.session.destroy();
            res.send(1);
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