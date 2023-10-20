import * as React from "react";
import Terminal, { TerminalProps } from "./components/Terminal";
import ContextProvider from "./contexts";

export { useEditorCommands } from "./hooks/editor";
export { TerminalContextProvider } from "./contexts/TerminalContext";

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


export function ReTerminal(props: any): any {
  return (
    <ContextProvider>
      <Terminal {...defaultProps} {...props} />
    </ContextProvider>
  );
}
