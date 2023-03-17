import React, { createElement } from "react";
import { Button } from "@mui/material";

import EditActionButton from "../components/EditActionButton";
import ViewActionButton from "../components/ViewActionButton";

export const componentMap: { [key: string]: any } = {
  Edit: EditActionButton,
  View: ViewActionButton,
};

export function generateComponent(componentName: string, id: string | number) {
  //   console.log("deleteMe got here c1 and componentName is: " + componentName);
  console.log("deleteMe got here c2 and id is: ");
  console.log(id);
  const Returncomponent = componentMap[componentName] || null;
  //   console.log("deleteMe Returncomponent is: ");
  //   console.log(Returncomponent);
  return createElement(Returncomponent, { id });
  //   const deleteMeReturnVal = <Returncomponent id={id}></Returncomponent>;
  //   console.log("deleteMe deleteMeReturnVal is: ");
  //   console.log(deleteMeReturnVal);
  //   console.log(typeof deleteMeReturnVal);
  //   return <Returncomponent props={id}></Returncomponent>; // @TODO how to pass id={id}?
}
