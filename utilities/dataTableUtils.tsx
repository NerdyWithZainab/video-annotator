import { GridRenderCellParams } from "@mui/x-data-grid";
import { generateComponent } from "./componentUtils";

export function populateWithActionButtons(params: GridRenderCellParams) {
  const rowId: number | string = params?.id || "";
  const actionButtonKeys: string[] = params?.value?.split(" ") || [];
  return (
    <>
      {actionButtonKeys.map((actionButtonKey) => {
        return generateComponent(actionButtonKey, rowId);
      })}
    </>
  );
}
