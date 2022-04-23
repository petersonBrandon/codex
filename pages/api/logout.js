import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute ( 
    async (req, res) => { 
        if (req.method !== 'GET') {
            res.status(405).send({ message: 'Only GET requests allowed' });
            return
        } else {
            req.session.destroy();
            res.send("Logout Success");
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
    