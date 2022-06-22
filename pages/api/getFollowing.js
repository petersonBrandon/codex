import dbConnect from '../../lib/connectDB';
import Project from '../../models/project';
import { json } from 'express';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();

        const user = req.body.user;
        const projectId = req.body.projectId;

        const project = await Project.findById(projectId);
        let alreadyFollowed = false;
        for (let i = 0; i < project.followers.length; i++) {
            if(project.followers[i].userId == user.userId) {
                alreadyFollowed = true;
            }
        }
        res.json({isFollowing: alreadyFollowed})
    }
}