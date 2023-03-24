import { createElement } from "react";

import EditActionButton from "../components/EditActionButton";
import ViewActionButton from "../components/ViewActionButton";

export const componentMap: { [key: string]: any } = {
  Edit: EditActionButton,
  View: ViewActionButton,
};

export function generateComponent(componentName: string, id: string | number) {
  const Returncomponent = componentMap[componentName] || null;
  return createElement(Returncomponent, { id, key: id });
}
