import * as React from "react";
import Terminal from "./components/Terminal";
import ContextProvider from "./contexts";

export { useEditorCommands } from "./hooks/editor";
export { TerminalContextProvider } from "./contexts/TerminalContext";

export function ReTerminal(props: any): any {
  return (
    <ContextProvider>
      <Terminal {...props} />
    </ContextProvider>
  );
}
