const pool = require("../database/index");
const { v4: uuidv4 } = require("uuid");

const meetingsController = {
  index: async (req, res) => {
    try{

      const host_user_id = req.session?.user?.id? req.session.user.id : 0;

      const {room_code} = req.query;

      const [meeting_info] = await pool.query(`SELECT * FROM meeting_rooms WHERE room_code = ?`, [room_code]);

      if(meeting_info.length === 0){
        return res.status(404).json({message : "Meeting room not found"})
      }

      const [participants] = await pool.query(`
        SELECT meeting_participants.*, users.user_code, users.name, users.image FROM meeting_participants
        JOIN users ON users.user_id = meeting_participants.user_id
        WHERE meeting_room_id = ?
      `,[meeting_info[0].meeting_room_id]);

      for(const participant of participants){
        participant.isSelf = false;
        if(participant.user_id === host_user_id){
          participant.isSelf = true;
        }
      }

      res.json({
        meeting_info: meeting_info[0],
        participants: participants
      })

    }
    catch(error){
      console.log("Fetching room infomation error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    // Check if user session exists
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const host_user_id = req.session.user.id;
    const { name, description, duration } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Meeting name is required" });
    }

    // Generate a unique room code
    const roomCode = `MRC-${uuidv4()}`;

    // Parse duration into start_time and end_time
    const start_time = new Date();
    let end_time = null;
    if (duration !== "Unlimited") {
      const [hours, minutes] = duration.split(" ").map((d) => parseInt(d) || 0);
      end_time = new Date(start_time);
      end_time.setHours(start_time.getHours() + hours);
      end_time.setMinutes(start_time.getMinutes() + minutes);
    }

    // Insert into `meeting_rooms`
    const meetingRoomQuery = `
      INSERT INTO meeting_rooms (host_user_id, room_name, room_description, room_code, start_time, end_time, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'active', NOW())
    `;

    const [result_creation] = await pool.query(
      meetingRoomQuery,
      [host_user_id, name, description, roomCode, start_time, end_time],
    );

    if(result_creation.affectedRows > 0){
      await pool.query(`
        INSERT INTO meeting_participants (meeting_room_id, user_id, role, created_at)
         VALUES (?, ?, 'host', NOW())
      `, [result_creation.insertId, host_user_id]
      )
    }

    return res.status(200).json({
      message: "Meeting created successfully",
      roomCode
    });
  },
  preJoin: async (req, res) => {
    try {
      // Get the room code from the request body
      const { room_code } = req.body;
  
      if (!room_code) {
        return res.status(400).json({ message: "Room code is required." });
      }
  
      // Check if the room exists in the database
      const [meeting_info] = await pool.query(
        `SELECT * FROM meeting_rooms WHERE room_code = ? AND status = 'active'`,
        [room_code]
      );
  
      if (meeting_info.length === 0) {
        return res.status(404).json({ message: "Room not found or inactive." });
      }
  
      // If the room exists, return its details
      return res.status(200).json({
        message: "Room exists.",
        meeting_info: meeting_info[0],
      });
    } catch (error) {
      console.log("Error checking room code:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  },
  join: async (req, res) => {
    try {
      // Authorization check
      if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
      }

      const user_id = req.session.user.id;
      const { room_code } = req.body;

      // Fetch the meeting room
      const [meeting_info] = await pool.query(
        `SELECT * FROM meeting_rooms WHERE room_code = ? AND status = 'active'`,
        [room_code]
      );

      if (meeting_info.length === 0) {
        return res.status(404).json({ message: "Meeting room not found or inactive." });
      }

      const meeting_room_id = meeting_info[0].meeting_room_id;

      // Check if the user is already a participant
      const [existingParticipant] = await pool.query(
        `SELECT * FROM meeting_participants WHERE meeting_room_id = ? AND user_id = ?`,
        [meeting_room_id, user_id]
      );

      if (existingParticipant.length > 0) {
        return res.status(200).json({
          message: "You have already joined this meeting.",
          meeting_info: meeting_info[0],
        });
      }

      // Add the user as a participant
      await pool.query(
        `INSERT INTO meeting_participants (meeting_room_id, user_id, role, created_at)
         VALUES (?, ?, 'participant', NOW())`,
        [meeting_room_id, user_id]
      );

      return res.status(200).json({
        message: "Successfully joined the meeting.",
        meeting_info: meeting_info[0],
      });
    } catch (error) {
      console.log("Error joining the meeting room:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
  exit: async (req, res) => {
    try {
      // Authorization check
      if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
      }
  
      const user_id = req.session.user.id;
      const { room_code } = req.body;
  
      // Fetch the meeting room
      const [meeting_info] = await pool.query(
        `SELECT * FROM meeting_rooms WHERE room_code = ? AND status = 'active'`,
        [room_code]
      );
  
      if (meeting_info.length === 0) {
        return res.status(404).json({ message: "Meeting room not found or inactive." });
      }
  
      const meeting_room_id = meeting_info[0].meeting_room_id;
  
      // Check if the user is a participant
      const [existingParticipant] = await pool.query(
        `SELECT * FROM meeting_participants WHERE meeting_room_id = ? AND user_id = ?`,
        [meeting_room_id, user_id]
      );
  
      if (existingParticipant.length === 0) {
        return res.status(404).json({ message: "You are not a participant in this meeting." });
      }
  
      // Remove the user from the participants table
      await pool.query(
        `DELETE FROM meeting_participants WHERE meeting_room_id = ? AND user_id = ?`,
        [meeting_room_id, user_id]
      );
  
      // Check if there are any participants left in the room
      const [remainingParticipants] = await pool.query(
        `SELECT * FROM meeting_participants WHERE meeting_room_id = ?`,
        [meeting_room_id]
      );
  
      if (remainingParticipants.length === 0) {
        // If no participants are left, delete the room
        await pool.query(`DELETE FROM meeting_rooms WHERE meeting_room_id = ?`, [meeting_room_id]);
        return res.status(200).json({
          message: "You were the last participant. The meeting room has been deleted.",
        });
      }
  
      return res.status(200).json({
        message: "Successfully exited the meeting room.",
      });
    } catch (error) {
      console.log("Error exiting the meeting room:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};

module.exports = meetingsController;
