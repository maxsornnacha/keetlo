const { exec } = require("child_process");
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

        //call shell script to work
        console.log('Webhook verified.');
        //Do Executing the shell script
        exec('sh /mnt/xvdd/keetlo/api/shell/deploy.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                return res.status(500).send('Script execution failed');
            }
    
            if (stderr) {
                console.error(`Script STDERR: ${stderr}`);
            }
    
            console.log(`Script STDOUT: ${stdout}`);
            res.status(200).send('Webhook received and script executed');
        });
    }
    //Test auto hook again

}

module.exports = usersController;