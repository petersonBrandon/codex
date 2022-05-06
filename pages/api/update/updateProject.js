import dbConnect from '../../../lib/connectDB';
import Project from '../../../models/project';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();

        const projId = req.body.projId;
        const title = req.body.title;
        const desc = req.body.desc;

        await Project.findByIdAndUpdate(projId, {title: title, description: desc});

        res.send(1);

        
    }
}