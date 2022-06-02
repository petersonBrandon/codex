import dbConnect from '../../lib/connectDB';
import Project from'../../models/project';
import User from '../../models/user';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    } else {
        await dbConnect();

        const projectName = req.body.projectName;
        const projectDesc = req.body.projectDesc;
        const userEmail = req.body.email;

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

        const newProject = new Project({
            title: projectName,
            description: projectDesc,
            dateStarted: currentDate
        });

        try {
            await newProject.save();
            const user = await User.findOne({email: userEmail});
            user.projects.push(newProject._id);
            await user.save();
        } catch {
            res.send(-1);
        }
        res.send(1);
    }
  }