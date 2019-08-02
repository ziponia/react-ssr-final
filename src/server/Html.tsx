import React, { ReactElement } from "react";

type Props = {
  scriptTags: Array<ReactElement<{}>>;
  linkTags: Array<ReactElement<{}>>;
  styleTags: Array<ReactElement<{}>>;
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
      {props.scriptTags}
    </body>
  </html>
);

export default Html;
