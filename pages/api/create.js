import dbConnect from '../../lib/connectDB';
import Project from'../../models/project';
import Post from '../../models/post'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    } else {
        await dbConnect();

        const isNewProj = req.body.createProject;

        const project = req.body.projectSelect;
        const newProjectTitle = req.body.projectTitle;
        const newProjDesc = req.body.projectDesc;

        const postTitle = req.body.postTitle;
        const postText = req.body.postText;

        let postExcerpt = "";

        const date = new Date();
        const cDay = date.getDate();
        const cMonth = date.getMonth() + 1;
        const cYear = date.getFullYear();
        let cHour = date.getHours();
        const cMinutes = date.getMinutes();

        const currentDate = `${cHour}:${cMinutes}${tail}  ${cMonth}/${cDay}/${cYear}`;

        for (let i = 0; i < 100; i++) {
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
        } else {
            const updateProj = await Project.findById(project);
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