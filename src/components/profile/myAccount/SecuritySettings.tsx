import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Switch, 
  TextField, 
  Button, 
  Box, 
  FormControlLabel 
} from '@mui/material';

export function SecuritySettings() {
  return (
    <Card>
      <CardHeader
        title="Security Settings"
        subheader="Manage your account security preferences"
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <FormControlLabel
              control={<Switch />}
              label={
                <Box>
                  <Typography variant="body1">Two-Factor Authentication</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add an extra layer of security to your account
                  </Typography>
                </Box>
              }
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Current Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="primary">
              Update Password
            </Button>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Login History
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last login: 2023-06-15 14:30:00
            </Typography>
            <Typography variant="body2" color="text.secondary">
              IP Address: 192.168.1.1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Device: Chrome on Windows
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              View Full Login History
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}