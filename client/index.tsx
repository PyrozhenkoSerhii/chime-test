import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { MeetingProvider, lightTheme } from "amazon-chime-sdk-component-library-react";

import { App } from "./App";

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    margin: 0;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
    font-family: "Open Sans";
  }
`;

render(
  <ThemeProvider theme={lightTheme}>
    <MeetingProvider>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </MeetingProvider>
  </ThemeProvider>,
  document.getElementById("app"),
);
