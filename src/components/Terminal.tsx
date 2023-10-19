import { isMobile } from "react-device-detect";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useClickOutsideEvent } from "../hooks/terminal";

import Controls from "./Controls";
import Editor from "./Editor";
import React, { useRef, useState, useContext } from "react";
import { Command, Message } from "../types";

type TerminalProps = {
  enableInput: boolean,
  caret: boolean,
  theme: string,
  showControlBar: boolean,
  showControlButtons: boolean,
  controlButtonLabels: string[],
  prompt: string,
  commands: {
    [name in string]: Command
  },
  welcomeMessage:  Message | (() => Message),
  errorMessage: Message | (() => Message),
  defaultHandler: () => Message,
}

export default function Terminal(props: TerminalProps) {
  const wrapperRef = useRef(null);
  const [consoleFocused, setConsoleFocused] = useState(!isMobile);
  const style = useContext(StyleContext);
  const themeStyles = useContext(ThemeContext);

  useClickOutsideEvent(wrapperRef, consoleFocused, setConsoleFocused);

  // Get all props destructively
  const {
    caret,
    theme,
    showControlBar,
    showControlButtons,
    controlButtonLabels,
    prompt,
    commands,
    welcomeMessage,
    errorMessage,
    enableInput,
    defaultHandler
  } = props;

  const controls = showControlBar ? <Controls
    consoleFocused={consoleFocused}
    showControlButtons={showControlButtons}
    controlButtonLabels={controlButtonLabels}/> : null;

  const editor = <Editor
    caret={caret}
    consoleFocused={consoleFocused}
    prompt={prompt}
    commands={commands}
    welcomeMessage={welcomeMessage}
    errorMessage={errorMessage}
    enableInput={enableInput}
    showControlBar={showControlBar}
    defaultHandler={defaultHandler}
  />

  return (
    <div
      ref={wrapperRef}
      id={style.terminalContainer}
      className={style[`theme--${theme}`]}
      data-testid="terminal"
    >
      <div className={`${style.terminal}`} style={{ background: themeStyles.themeToolbarColor, color: themeStyles.themeColor }}>
        {controls}
        {editor}
      </div>
    </div>
  );
}

const defaultProps: TerminalProps = {
  enableInput: true,
  caret: true,
  theme: "light",
  showControlBar: true,
  showControlButtons: true,
  controlButtonLabels: ["close", "minimize", "maximize"],
  prompt: ">>>",
  commands: {},
  welcomeMessage: "",
  errorMessage: "not found!",
  defaultHandler: null,
};
