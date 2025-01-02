import { atom, createStore } from "jotai";
import { Query } from "./types";

export const atomStore = createStore();

export const queryAtom = atom<Query | null>(null);
