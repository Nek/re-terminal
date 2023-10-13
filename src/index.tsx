import * as React from "react";
import * as Terminal from "./components/Terminal";
import * as ContextProvider from "./contexts";
import { useEditorCommands as _uEC } from "./hooks/editor";

export const useEditorCommands = _uEC;

export { TerminalContextProvider } from "./contexts/TerminalContext";

export function ReactTerminal(props: any): any {
  return (
    <ContextProvider.default>
      <Terminal.default {...props} />
    </ContextProvider.default>
  );
}
