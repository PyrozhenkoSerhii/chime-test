import * as React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useMeetingManager, LocalVideo, useRemoteVideoTileState, useLocalVideo, RemoteVideo } from "amazon-chime-sdk-component-library-react";

export interface CallData {
  id: string;
  isOwner: boolean;
  isExport: boolean;
}

interface IProps {
  callData: CallData;
}

const { useEffect } = React;

export const CallPage = ({ callData }: IProps): JSX.Element => {
  const meetingManager = useMeetingManager();
  const { toggleVideo } = useLocalVideo();

  const joinChimeRoom = async (roomId: string) => {
    const response = await axios.post(`http://localhost:${process.env.PORT}/api/chime`, { meetingId: roomId, userId: uuidv4() });

    const joinData = {
      meetingInfo: response.data.meeting,
      attendeeInfo: response.data.attendee,
    };

    await meetingManager.join(joinData);

    await meetingManager.start();

    toggleVideo();
  };

  useEffect(() => {
    if (callData) {
      joinChimeRoom(callData.id);
    }
  }, [callData]);

  const { tiles } = useRemoteVideoTileState();
  const videos = tiles.map((remoteTileId) => <RemoteVideo style={{ height: "500px" }} tileId={remoteTileId} />);

  return (
    <>
      <LocalVideo style={{ height: "500px" }} />
      <div className={`grid grid--size-${tiles.length}`}>
        { tiles.length ? videos : "No remote videos available" }
      </div>
    </>
  );
};
