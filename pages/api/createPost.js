import dbConnect from '../../lib/connectDB';
import Project from'../../models/project';
import Post from '../../models/post';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    } else {
        await dbConnect();

        const projectId = req.body.projId;
        const postTitle = req.body.title;
        const postText = req.body.desc;

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

        const currentDate = `${cHour}:${cMinutes}  ${cMonth}/${cDay}/${cYear}`;

        if(postText.length > 120) {
            for (let i = 0; i < 120; i++) {
                if ( postText[i] !== undefined ) {
                    postExcerpt += postText[i];
                } 
            }
            postExcerpt += "...";
        } else {
            postExcerpt = postText;
        }        

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
            
        try {
            await post.save();
            await Project.findOneAndUpdate(updateProj._id, updateProj, { new: true });
        } catch {
            res.send(-1);
        }
        res.send(1)
    }
  }