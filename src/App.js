// https://dev.to/majov84382672/pwa-codepen-clone-1amf
import React, { useState, useEffect } from "react";
import Editor from "./Editor";
// import Terminal from "./Terminal";
import useLocalStorage from "./useLocalStorage";

// import SplitterLayout from "react-splitter-layout";

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

  const code = `const a = 0;`;

  return (
    <>
      {/* <SplitterLayout
        split="horizontal"
        minSize={820}
        maxSize={-176}
        defaultSize="69%"
        primary="first"
        borderColor="#999"
        percentage={false}
        primaryIndex={1}
        secondaryInitialSize={100}
      > */}
      <div className="pane top-pane">
        {/* <div className="small-pane"> */}
        <Editor
          defaultValue={code}
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
      {/* </SplitterLayout> */}

      {/* <SplitterLayout
        borderColor="#999"
        percentage={false}
        primaryIndex={1}
        secondaryInitialSize={100}
      > */}
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
      {/* </SplitterLayout> */}
    </>
  );
}

export default App;
