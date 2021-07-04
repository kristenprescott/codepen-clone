// https://dev.to/majov84382672/pwa-codepen-clone-1amf
import React, { useState, useEffect } from "react";
import Editor from "./Editor";
// import Terminal from "./Terminal";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");

  const [srcDoc, setSrcDoc] = useState("");

  // const [history, setHistory] = useState([]);

  // const addItem = (item) => {
  //   history.push(item);
  //   setHistory(history);
  // };

  // const clearHistory = () => setHistory([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        {/* <div className="small-pane"> */}
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          // addItem={addItem}
        />
        {/* </div> */}
        {/* <div className="small-pane"> */}
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          // addItem={addItem}
        />
        {/* </div> */}
        {/* <div className="small-pane"> */}
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          // addItem={addItem}
        />
        {/* </div> */}
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />

        {/* <Terminal history={history} clearHistory={clearHistory} /> */}
      </div>
    </>
  );
}

export default App;
