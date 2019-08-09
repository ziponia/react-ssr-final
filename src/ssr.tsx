import React from "react";
import ReactDOMServer from "react-dom/server";
import Koa, { Middleware } from "koa";
import Router from "koa-router";
import serve from "koa-static";
import path from "path";
import App from "./App";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { StaticRouter } from "react-router-dom";
import reducer, { RootState } from "./module";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";

const statsFile = path.join("../build", "loadable-stats.json");

const createPage = (
  html: string,
  collected: {
    scriptTags: string;
    linkTags: string;
    styleTags: string;
    preloadedState: RootState;
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
        <script>
          window.__PRELOADED_STATE__=${JSON.stringify(
            collected.preloadedState
          ).replace(/</g, "\\u003c")}
        </script>
        ${collected.scriptTags}
        </body>
    </html>
    `;
};

const render: Middleware = async (ctx, next) => {
  const context = {};

  const store = createStore(reducer);
  const preloadedState = store.getState();
  console.log("setting preload state");

  const extractor = new ChunkExtractor({ statsFile });
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();
  console.log("before jsx");
  const jsx = extractor.collectChunks(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={ctx.path} context={ctx}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </StaticRouter>
    </ChunkExtractorManager>
  );
  console.log("compleate jsx");
  const rendered = ReactDOMServer.renderToString(jsx);
  ctx.body = createPage(rendered, {
    scriptTags,
    styleTags,
    linkTags,
    preloadedState
  });
};

const app = new Koa();
const router = new Router();
router.get("/", render);
app.use(router.routes());
app.use(serve(path.resolve("./build"))); // serves static files
app.use((ctx, next) => {
  if (ctx.status !== 404) {
    console.log(ctx.status, " 여기~~ ");
    return;
  }
  console.log(ctx.status, " 렌더링~~ ");
  return next();
});
app.use(render);

app.listen(4000, () => console.log("Listen At 4000"));
