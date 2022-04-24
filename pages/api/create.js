import dbConnect from '../../lib/connectDB';
import Project from'../../models/project';
import Post from '../../models/post';
import User from '../../models/user';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    } else {
        await dbConnect();

        const isNewProj = req.body.createProject;

        const projectId = req.body.projectId;
        const newProjectTitle = req.body.projectTitle;
        const newProjDesc = req.body.projectDesc;

        const postTitle = req.body.postTitle;
        const postText = req.body.postText;

        const userEmail = req.body.userEmail;

        let postExcerpt = "";

        const date = new Date();
        const cDay = date.getDate();
        const cMonth = date.getMonth() + 1;
        const cYear = date.getFullYear();
        const cHour = date.getHours();
        let cMinutes = date.getMinutes();

        if (cMinutes < 10) {
            cMinutes = `0${cMinutes}`;
        }

        console.log(req.body);

        const currentDate = `${cHour}:${cMinutes}  ${cMonth}/${cDay}/${cYear}`;

        for (let i = 0; i < 120; i++) {
            if ( postText[i] !== undefined ) {
                postExcerpt += postText[i];
            } 
        }

        postExcerpt += "...";

        if (isNewProj) {
            const post = new Post({
                title: postTitle,
                author: "Brandon Peterson",
                excerpt: postExcerpt,
                text: postText,
                dateCreated: currentDate
            });
            const newProject = new Project({
                title: newProjectTitle,
                description: newProjDesc,
                dateStarted: currentDate,
                posts: [{
                    postId: post._id
                }]
            })

            await post.save();
            await newProject.save();
            const user = await User.findOne({email: userEmail});
            user.projects.push(newProject._id);
            await user.save();
        } else {
            const updateProj = await Project.findById(projectId);
            const post = new Post({
                title: postTitle,
                author: "Brandon Peterson",
                excerpt: postExcerpt,
                text: postText,
                dateCreated: currentDate
            });

            updateProj.posts.push({
                postId: post._id
            });
            
            await post.save();
            await Project.findOneAndUpdate(updateProj._id, updateProj, { new: true });
        }
        res.redirect('/New');
    }
  }