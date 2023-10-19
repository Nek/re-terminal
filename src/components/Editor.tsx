import * as React from "react";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { TerminalContext } from "../contexts/TerminalContext";
import { useCurrentLine, useScrollToBottom } from "../hooks/editor";
import { Command, Message } from "../types";

type EditorProps = {
  enableInput: boolean;
  caret: boolean;
  consoleFocused: boolean;
  prompt: string;
  commands: {
    [name in string]: Command
  },
  welcomeMessage:  Message | (() => Message),
  errorMessage: Message | (() => Message),
  showControlBar: boolean;
  defaultHandler: () => Message,
};

export default function Editor(props: EditorProps) {
  const wrapperRef = React.useRef(null);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);
  const { bufferedContent } = React.useContext(TerminalContext);

  useScrollToBottom(bufferedContent, wrapperRef);

  const {
    enableInput,
    caret,
    consoleFocused,
    prompt,
    commands,
    welcomeMessage,
    errorMessage,
    showControlBar,
    defaultHandler,
  } = props;

  const currentLine = useCurrentLine(
    caret,
    consoleFocused,
    prompt,
    commands,
    errorMessage,
    enableInput,
    defaultHandler,
    wrapperRef
  );

  return (
    <div
      id={"terminalEditor"}
      ref={wrapperRef}
      className={`${style.editor} ${!showControlBar ? style.curvedTop : null} ${
        showControlBar ? style.editorWithTopBar : null
      }`}
      style={{ background: themeStyles.themeBGColor }}
    >
      {welcomeMessage}
      {bufferedContent}
      {currentLine}
    </div>
  );
}
