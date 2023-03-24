import { GridRenderCellParams } from "@mui/x-data-grid";
import { generateComponent } from "./componentUtils";

export function populateWithActionButtons(
  tableTitle: string,
  params: GridRenderCellParams
) {
  const rowId: number | string = params?.id || "";
  const field: string = params?.field || "";
  const actionButtonKeys: string[] = params?.value?.split(" ") || [];
  return (
    <>
      {actionButtonKeys.map((actionButtonKey) => {
        return generateComponent(
          actionButtonKey,
          tableTitle + field + rowId + actionButtonKey
        );
      })}
    </>
  );
}
