import React, { createElement } from "react";
import { Button } from "@mui/material";

import EditActionButton from "../components/EditActionButton";
import ViewActionButton from "../components/ViewActionButton";

const componentMap: { [key: string]: any } = {
  Edit: EditActionButton,
  View: ViewActionButton,
};

export function generateComponent(componentName: string, id: string | number) {
  const Returncomponent = componentMap[componentName] || "span";
  return createElement(Returncomponent, { id: { id } });
  //   return <Returncomponent>{children}</Returncomponent> />; // @TODO how to pass id={id}?
}
