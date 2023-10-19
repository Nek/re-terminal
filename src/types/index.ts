export type Command = (prompt?: string) => Message | undefined;

export type Message = JSX.Element[] | JSX.Element | string;
