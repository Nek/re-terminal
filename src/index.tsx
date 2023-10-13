import * as React from "react";
import * as Terminal from "./components/Terminal";
import * as ContextProvider from "./contexts";
export { useEditorCommands } from "./hooks/editor";

export { TerminalContextProvider } from "./contexts/TerminalContext";

export function ReactTerminal(props: any): any {
  return (
    <ContextProvider.default>
      <Terminal.default {...props} />
    </ContextProvider.default>
  );
}
