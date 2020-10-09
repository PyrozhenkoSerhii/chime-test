import * as React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  useMeetingManager, LocalVideo, CameraSelection, useRemoteVideoTileState, VideoTileGrid,
  useLocalVideo, MicSelection, VideoInputControl, ContentShareControl, RemoteVideo,
} from "amazon-chime-sdk-component-library-react";

const { useEffect } = React;

export const App = (): JSX.Element => {
  const meetingManager = useMeetingManager();
  console.log(meetingManager);
  const { tiles } = useRemoteVideoTileState();
  const videos = tiles.map((tileId) => <RemoteVideo style={{ height: "500px" }} tileId={tileId} />);

  const chimeTest = async () => {
    const response = await axios.post(`http://localhost:${process.env.PORT}/api/chime`, { userId: uuidv4() });

    const joinData = {
      meetingInfo: response.data.meeting,
      attendeeInfo: response.data.attendee,
    };

    console.log(joinData);

    await meetingManager.join(joinData);

    await meetingManager.start();
  };

  useEffect(() => {
    chimeTest();
  }, []);

  const { toggleVideo } = useLocalVideo();

  console.log("tiles:", tiles);

  return (
    <>
      <CameraSelection />
      <MicSelection />
      <LocalVideo style={{ height: "500px" }} />
      <button onClick={toggleVideo} type="button">Toggle video</button>
      <VideoInputControl />
      <ContentShareControl />
      <div className={`grid grid--size-${tiles.length}`}>
        { tiles.length ? videos : "No remote videos available" }
      </div>
      <VideoTileGrid />
    </>
  );
};
