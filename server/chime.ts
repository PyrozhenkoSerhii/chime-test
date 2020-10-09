import { Request, Response, Router } from "express";
import {v4 as uuidv4} from "uuid";

import AWS from "aws-sdk";

AWS.config.credentials = new AWS.Credentials({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const chime = new AWS.Chime({region: "us-east-1"});
chime.endpoint = new AWS.Endpoint("https://service.chime.aws.amazon.com/console");
const mediaPlacementRegion = "us-east-1";

export const chimeRouter = Router();


chimeRouter.post("/chime", async (req: Request, res: Response) => {
  console.log(req.body);
  const {userId} = req.body

  try {
    const requestId = uuidv4();

    const meeting = await chime.createMeeting({
      ClientRequestToken: requestId,
      MediaRegion: mediaPlacementRegion,
    }).promise();

    const meetingId = meeting.Meeting.MeetingId;

    const attendee = await chime.createAttendee({
      MeetingId: meetingId,
      ExternalUserId: userId,
    }).promise();

    const attendeeId = attendee.Attendee.AttendeeId;

    return res.status(200).send({
      meetingId,
      attendeeId,
    });
  } catch(err) {
    console.log('Error while POST /chime request', err)
  }
})
