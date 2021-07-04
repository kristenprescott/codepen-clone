import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/xml-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/show-hint.js";

import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/keymap/sublime";

import "codemirror/addon/selection/active-line";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/indent-fold";
import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/fold/foldgutter.css";

import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/match-highlighter";
import "codemirror/addon/search/jump-to-line.js";
import "codemirror/addon/search/match-highlighter.js";
import "codemirror/addon/search/matchesonscrollbar.css";
import "codemirror/addon/search/matchesonscrollbar.js";

import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/hint/anyword-hint";

export default function Editor(props) {
  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);
  // const [completion, setCompletion] = useState(null)

  function handleChange(editor, data, value) {
    onChange(value);
    editor.showHint({ completeSingle: false });

    console.log(editor, data, value);
  }

  const handleKeydown = (editor, event) => {
    if (
      !editor.state.completionActive &&
      event.key !== "Shift" &&
      event.key !== "Enter"
    ) {
      editor.showHint({ completeSingle: false });
    }
  };

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        onKeyDown={handleKeydown}
        value={value}
        className="code-mirror-wrapper"
        autoScroll="true"
        options={{
          mode: language,
          theme: "material",
          lint: true,
          inputStyle: "contenteditable",
          lineWrapping: true,
          smartIndent: true,
          lineNumbers: true,
          fixedGutter: false,
          foldGutter: true,
          foldOptions: { widget: "\u2026" },
          gutters: [
            "CodeMirror-foldgutter",
            "CodeMirror-lint-markers",
            "CodeMirror-linenumbers",
          ],
          autoCloseTags: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          autoRefresh: true,
          tabSize: 2,
          keyMap: "sublime",
          extraKeys: {
            Tab: "autocomplete",
            //  "Ctrl-Q": function(cm){console.log("HEREEE");
          },
          autofocus: true,
          highlightSelectionMatches: {
            minChars: 2,
            showToken: /Hello/,
            style: "matchhighlight",
          },
          styleActiveLine: true,
          styleActiveSelected: true,
          viewportMargin: 99,
          cursorScrollMargin: 48,
        }}
      />
    </div>
  );
}
