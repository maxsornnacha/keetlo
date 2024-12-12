import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export function RecentActivity() {
  const activities = [
    { id: 1, action: "Hosted a meeting", date: "2023-06-15" },
    { id: 2, action: "Updated profile picture", date: "2023-06-14" },
    { id: 3, action: "Joined team workspace", date: "2023-06-13" },
    { id: 4, action: "Created new meeting room", date: "2023-06-12" },
  ];

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Recent Activity
          </Typography>
        }
        subheader={
          <Typography variant="body2" component="div" color="textSecondary">
            Your latest actions on Keetlo
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <List>
          {activities.map((activity) => (
            <div key={activity.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1" component="span">
                      {activity.action}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" component="span" color="textSecondary">
                      {activity.date}
                    </Typography>
                  }
                />
              </ListItem>
              {activity.id !== activities[activities.length - 1].id && <Divider />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
