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

         // Extract branch name from the payload
        const ref = req.body.ref; // Example: 'refs/heads/main'
        const branch = ref?.split('/').pop(); // Extracts the branch name
        console.log(`Branch pushed: ${branch}`);

        // Define shell scripts for each branch
        let scriptPath = '';

        switch (branch) {
        case 'main':
            scriptPath = '/mnt/xvdd/keetlo/api/shell/client.sh';
            break;
        case 'api':
            scriptPath = '/mnt/xvdd/keetlo/api/shell/api.sh';
            break;
        case 'socket':
            scriptPath = '/mnt/xvdd/keetlo/api/shell/socket.sh';
            break;
        default:
            console.log(`No script defined for branch: ${branch}`);
            return res.status(400).send(`No script defined for branch: ${branch}`);
        }
        
        //Do Executing the shell script
        console.log(`Executing script for branch: ${branch}, running on script path : ${scriptPath}`);
        exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
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

}

module.exports = usersController;