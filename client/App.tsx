import * as React from "react";
import axios from "axios";

const { useEffect } = React;

export const App = (): JSX.Element => {
  const chimeTest = async () => {
    const result = await axios.post(`http://localhost:${process.env.PORT}/api/chime`, { userId: "some-id" });
    console.log(result);
  };

  useEffect(() => {
    chimeTest();
  }, []);

  return (
    <div>Test</div>
  );
};
