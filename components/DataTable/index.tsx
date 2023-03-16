import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { reduce, map } from "lodash-es";
import { useMemo } from "react";

const DataTable: React.FC<{ data: {}[]; visibleColumnDict?: {} }> = ({
  data,
  visibleColumnDict = { name: "Name", id: "ID" },
}) => {
  const rows: GridRowsProp = useMemo(() => {
    let tracker: number = 0;
    return data?.map((dataRow, idx) => {
      tracker++;
      const renamedCollection: { [key: string]: any } = reduce(
        Object.values(dataRow),
        (memo: {}, el: any, elIdx: number) => {
          const colNum: number = elIdx + 1;
          return { ...memo, ["col" + colNum]: el };
        },
        {}
      );
      return { id: idx + 1, ...renamedCollection };
    });
  }, [data]);

  const columns: GridColDef[] = useMemo(() => {
    const safePrototypeRow: { [key: string]: any } = data[0] || {};
    const visibleColumnDictKeys: string[] =
      Object.keys(visibleColumnDict) || [];
    let prototypeRowWithOnlyDesiredCols: { [key: string]: any } =
      safePrototypeRow;
    if (visibleColumnDictKeys.length > 0) {
      prototypeRowWithOnlyDesiredCols = reduce(
        safePrototypeRow,
        (memo: {}, col: any, colKey: string) => {
          if (visibleColumnDictKeys.includes(colKey)) {
            return { ...memo, [colKey]: col };
          } else {
            return { ...memo };
          }
        },
        {}
      );
    }
    console.log("deleteMe prototypeRowWithOnlyDesiredCols is: ");
    console.log(prototypeRowWithOnlyDesiredCols);
    let tracker: number = 0;
    return map(prototypeRowWithOnlyDesiredCols, (el, elKey) => {
      tracker++; // tracker seems needed because I can't get both the keys and the indexes in map(obj)
      const cleanHeader: string = elKey.trim().toLowerCase();
      const headerName: string =
        cleanHeader.charAt(0).toUpperCase() + cleanHeader.slice(1);
      return {
        field: "col" + tracker,
        headerName: headerName,
        width: 150,
      };
    });
  }, [data, visibleColumnDict]);

  return (
    <DataGrid
      rows={rows}
      rowHeight={40}
      columns={columns}
      style={{ minHeight: 200, marginBottom: "2vh" }}
    />
  );
};

export default DataTable;
