import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { reduce, map } from "lodash-es";
import { useMemo } from "react";

const DataTable: React.FC<{
  data: {}[];
  colNamesToDisplay?: { [key: string]: any };
}> = ({ data, colNamesToDisplay = { name: "Name", id: "ID" } }) => {
  const colNamesToDisplayKeys: string[] = useMemo(() => {
    return Object.keys(colNamesToDisplay) || [];
  }, [colNamesToDisplay]);

  const shouldFilter: boolean = useMemo(() => {
    return colNamesToDisplayKeys.length > 0;
  }, [colNamesToDisplayKeys]);

  const rows: GridRowsProp = useMemo(() => {
    let tracker: number = 0;
    return data?.map((dataRow, idx) => {
      tracker++;
      let dataRowWithOnlyDesiredCols: { [key: string]: any } = dataRow;
      if (shouldFilter) {
        dataRowWithOnlyDesiredCols = reduce(
          dataRow,
          (memo: {}, col: any, colKey: string) => {
            if (colNamesToDisplayKeys.includes(colKey)) {
              return { ...memo, [colKey]: col };
            } else {
              return { ...memo };
            }
          },
          {}
        );
      }
      const renamedDataRow: { [key: string]: any } = reduce(
        Object.values(dataRowWithOnlyDesiredCols),
        (memo: {}, el: any, elIdx: number) => {
          const colNum: number = elIdx + 1;
          return { ...memo, ["col" + colNum]: el };
        },
        {}
      );
      return { id: idx + 1, ...renamedDataRow };
    });
  }, [colNamesToDisplayKeys, data, shouldFilter]);

  const columns: GridColDef[] = useMemo(() => {
    const safePrototypeRow: { [key: string]: any } = data[0] || {};
    let prototypeRowWithOnlyDesiredCols: { [key: string]: any } =
      safePrototypeRow;
    if (shouldFilter) {
      prototypeRowWithOnlyDesiredCols = reduce(
        safePrototypeRow,
        (memo: {}, col: any, colKey: string) => {
          if (colNamesToDisplayKeys.includes(colKey)) {
            return { ...memo, [colKey]: col };
          } else {
            return { ...memo };
          }
        },
        {}
      );
    }
    let tracker: number = 0;
    return map(prototypeRowWithOnlyDesiredCols, (el, elKey) => {
      tracker++; // tracker seems needed because I can't get both the keys and the indexes in map(obj)
      const cleanHeader: string =
        colNamesToDisplay[elKey] || elKey.trim().toLowerCase();

      const headerName: string =
        cleanHeader.charAt(0).toUpperCase() + cleanHeader.slice(1);
      return {
        field: "col" + tracker,
        headerName: headerName,
        width: 150,
      };
    });
  }, [data, shouldFilter, colNamesToDisplayKeys, colNamesToDisplay]);

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
