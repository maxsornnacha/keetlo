import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Button, 
  Box 
} from '@mui/material';

export function AccountSettings() {
  return (
    <Card>
      <CardHeader
        title="Account Settings"
        subheader="Manage your account preferences and settings"
      />
      <CardContent>
        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">Email Notifications</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive email about your meeting activities
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            control={<Switch />}
            label={
              <Box>
                <Typography variant="body1">Marketing Emails</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive emails about new features and updates
                </Typography>
              </Box>
            }
          />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>Danger Zone</Typography>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1">Delete Account</Typography>
                <Typography variant="body2" color="text.secondary">
                  Permanently delete your account and all of your content
                </Typography>
              </Box>
              <Button variant="contained" color="error">
                Delete Account
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

