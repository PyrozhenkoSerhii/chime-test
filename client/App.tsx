import * as React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { parse, stringify } from "query-string";

import { CallPage, CallData } from "./call";
import { meetingSearchParams } from "./constants";

const { useEffect, useMemo, useState } = React;

export const App = (): JSX.Element => {
  const { search } = useLocation();
  const history = useHistory();

  const searchParams = useMemo(() => parse(search), [search]);

  const [callData, setCallData] = useState<CallData>(null);

  useEffect(() => {
    const ownCalls: Array<string> = JSON.parse(localStorage.getItem("ownCalls"));

    const { MEETING_ID } = meetingSearchParams;

    const meetingId = searchParams[MEETING_ID] as string;

    if (meetingId) {
      const isOwner = !!ownCalls && !!ownCalls.includes(meetingId);
      setCallData({
        id: meetingId,
        isOwner,
        isExport: false,
      });
      return;
    }

    const generatedMeetingId = uuidv4();
    searchParams[MEETING_ID] = generatedMeetingId;

    setCallData({
      id: generatedMeetingId,
      isOwner: true,
      isExport: false,
    });

    if (!ownCalls) {
      localStorage.setItem("ownCalls", JSON.stringify([generatedMeetingId]));
    } else {
      localStorage.setItem("ownCalls", JSON.stringify([...ownCalls, generatedMeetingId]));
    }

    history.push({
      search: stringify(searchParams),
    });
  }, []);

  if (!callData) {
    return <>Loading</>;
  }

  return (
    <CallPage callData={callData} />
  );
};
