import dbConnect from '../../../lib/connectDB';
import Project from '../../../models/project';
import User from '../../../models/user'
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
        const userDB = await User.findById(user.userId)
        let alreadyFollowed = false;
        for (let i = 0; i < project.followers.length; i++) {
            if(project.followers[i].userId == user.userId) {
                alreadyFollowed = true;
            }
        }

        let newFollowList = []
        if(alreadyFollowed) {
            // Update project follower list
            for (let i = 0; i < project.followers.length; i++) {
                if(project.followers[i].userId != user.userId) {
                    newFollowList.push(project.followers[i])
                }
            }
            project.followers = newFollowList;
            newFollowList = []

            // Update user follow list
            for (let i = 0; i < userDB.following.length; i++) {
                if(userDB.following[i].projectId != projectId) {
                    newFollowList.push(userDB.following[i])
                }
            }
            userDB.following = newFollowList;
        }
        else {
            project.followers.push({
                userId: user.userId
            })

            userDB.following.push({
                projectId: projectId
            })
        }
        try {
            await project.save()
            await userDB.save()
            res.json({success: true, isFollowing: !alreadyFollowed})
        } catch {
            res.json({success: false})
        }

    }
}