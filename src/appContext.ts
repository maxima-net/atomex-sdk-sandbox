import { Atomex } from "atomex-sdk/development";
import React from "react";

export const AppContext = React.createContext<{
    atomex: Atomex;
}>({atomex: null as unknown as Atomex});
