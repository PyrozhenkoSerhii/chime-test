import { Request, Response, Router } from "express";
import AWS from "aws-sdk";

AWS.config.credentials = new AWS.Credentials({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const chime = new AWS.Chime({region: "us-east-1"});
chime.endpoint = new AWS.Endpoint("https://service.chime.aws.amazon.com/console");
const mediaPlacementRegion = "us-east-1";

export const chimeRouter = Router();

/**
 * TODO: Check if I should recreate meeting for each attendee (works now)
 * If not - save corresponding "meetingId" and "actualMeetingId" somewhere
 */
chimeRouter.post("/chime", async (req: Request, res: Response) => {
  const {meetingId, userId} = req.body

  try {
    const meeting = await chime.createMeeting({
      ClientRequestToken: meetingId,
      MediaRegion: mediaPlacementRegion,
    }).promise();
    
    const actualMeetingId = meeting.Meeting.MeetingId;

    const attendee = await chime.createAttendee({
      MeetingId: actualMeetingId,
      ExternalUserId: userId,
    }).promise();

    return res.status(200).send({
      meeting: meeting.Meeting,
      attendee: attendee.Attendee,
    });
  } catch(err) {
    console.log('Error while POST /chime request', err)
  }
})
