const crypto = require("crypto");
const GITHUB_SECRET = process.env.GITHUB_SECRET;

const usersController = {
    api: async (req, res) => {
        const signature = `sha256=${crypto
            .createHmac('sha256', GITHUB_SECRET)
            .update(JSON.stringify(req.body))
            .digest('hex')}`;
        
        const isValid = req.headers['x-hub-signature-256'] === signature;
        
        if (!isValid) {
            console.log('Unauthorized request')
            return res.status(401).send('Unauthorized request');
        }

        console.log('GitHub Webhook Received:', req.body.action);

        res.status(200).send('Webhook received');
    }
}

module.exports = usersController;