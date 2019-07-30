import React from "react";
import ReactDOMServer from "react-dom/server";
import Koa, { Middleware } from "koa";
import Router from "koa-router";
import serve from "koa-static";
import path from "path";
import App from "./App";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { StaticRouter } from "react-router-dom";

const statsFile = path.join("../build", "loadable-stats.json");

const createPage = (
  html: string,
  collected: {
    scriptTags: string;
    linkTags: string;
    styleTags: string;
  }
) => {
  return `
    <html lang="ko">
        <head>
            <meta charset="utf-8" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />    
            <link rel="manifest" href="/manifest.json" />
            <title>React App</title>
            ${collected.linkTags}
            ${collected.styleTags}            
        </head>
        <body>
        <div id="root">${html}</div>
        ${collected.scriptTags}
        </body>
    </html>
    `;
};

const render: Middleware = async (ctx, next) => {
  const extractor = new ChunkExtractor({ statsFile });
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();
  const jsx = extractor.collectChunks(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={ctx.path}>
        <App />
      </StaticRouter>
    </ChunkExtractorManager>
  );
  const html = ReactDOMServer.renderToStaticMarkup(jsx);

  ctx.body = createPage(html, {
    scriptTags,
    linkTags,
    styleTags
  });
};

const app = new Koa();
const router = new Router();
router.get("/", render);
app.use(router.routes());
app.use(serve(path.resolve("./build"))); // serves static files
app.use((ctx, next) => {
  if (ctx.status !== 404) {
    return;
  }
  return next();
});
app.use(render);

app.listen(4000, () => console.log("Listen At 4000"));
