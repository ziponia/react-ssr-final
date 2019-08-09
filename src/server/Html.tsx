import React, { ReactElement } from "react";
import { RootState } from "../module";

type Props = {
  scriptTags: Array<ReactElement<{}>>;
  linkTags: Array<ReactElement<{}>>;
  styleTags: Array<ReactElement<{}>>;
  preloadedState: RootState;
};
const Html: React.FC<Props> = props => (
  <html lang="ko">
    <head>
      <meta charSet="utf-8" />
      <title>React - SSR</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href="/manifest.json" />
      {props.linkTags}
      {props.styleTags}
    </head>
    <body>
      <div id="root">{props.children}</div>
      <script>
        window.__PRELOADED_STATE__=
        {JSON.stringify(props.preloadedState).replace(/</g, "\\u003c")}
      </script>
      {props.scriptTags}
    </body>
  </html>
);

export default Html;
