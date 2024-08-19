"use client";
import { Fragment } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "./example";

export default function Home() {
  return (
    <Fragment>
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Example />
        </DndProvider>
      </div>
    </Fragment>
  );
}
