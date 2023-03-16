import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { reduce, map } from "lodash-es";
import { useMemo } from "react";

const DataTable: React.FC<{
  data: {}[];
  colNamesToDisplay?: { [key: string]: any };
}> = ({ data, colNamesToDisplay = {} }) => {
  const colNamesToDisplayKeys: string[] = useMemo(() => {
    return Object.keys(colNamesToDisplay) || [];
  }, [colNamesToDisplay]);

  const shouldFilter: boolean = useMemo(() => {
    return colNamesToDisplayKeys.length > 0;
  }, [colNamesToDisplayKeys]);

  const rows: GridRowsProp = useMemo(() => {
    return data?.map((dataRow, idx) => {
      let dataRowWithOnlyDesiredCols: { [key: string]: any } = dataRow;
      if (shouldFilter) {
        dataRowWithOnlyDesiredCols = reduce(
          dataRow,
          (memo: {}, col: any, colKey: string) => {
            const safeToInclude: boolean =
              colNamesToDisplayKeys.includes(colKey);
            return safeToInclude ? { ...memo, [colKey]: col } : { ...memo };
          },
          {}
        );
      }
      const renamedDataRow: { [key: string]: any } = reduce(
        // can't include in above reduce because this time I need the index number
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
    const safePrototypeRow: { [key: string]: any } = data[0] || {}; // assumes that the first row of the data has all of the columns desired (i.e., that it's a good prototype to use)
    let prototypeRowWithOnlyDesiredCols: { [key: string]: any } =
      safePrototypeRow;
    if (shouldFilter) {
      prototypeRowWithOnlyDesiredCols = reduce(
        safePrototypeRow,
        (memo: {}, col: any, colKey: string) => {
          const safeToInclude: boolean = colNamesToDisplayKeys.includes(colKey);
          return safeToInclude ? { ...memo, [colKey]: col } : { ...memo };
        },
        {}
      );
    }
    let tracker: number = 0;
    return map(prototypeRowWithOnlyDesiredCols, (el, elKey) => {
      tracker++; // tracker seems needed because I can't get both the keys and the indexes in map(obj)
      const cleanHeader: string = elKey.trim().toLowerCase();

      const headerName: string =
        colNamesToDisplay[elKey] ||
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
