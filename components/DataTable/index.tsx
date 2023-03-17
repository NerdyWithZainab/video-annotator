import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { AnyARecord } from "dns";
import { reduce, map } from "lodash-es";
import React, { useMemo } from "react";
import { generateComponent } from "../../utilities/componentUtils";
import ComponentWrapper from "../ComponentWrapper";
import EditActionButton from "../EditActionButton";

const DataTable: React.FC<{
  data: {}[];
  colNamesToDisplay?: { [key: string]: any };
  actionButtonsToDisplay?: { [key: string]: any };
}> = ({ data, colNamesToDisplay = {}, actionButtonsToDisplay = {} }) => {
  const actionButtonsKeys: string[] = useMemo(() => {
    return Object.keys(actionButtonsToDisplay) || [];
  }, [actionButtonsToDisplay]);

  const shouldAddActionButtons: boolean = useMemo(() => {
    return actionButtonsKeys.length > 0;
  }, [actionButtonsKeys]);

  let colNamesToDisplayWithActions: { [key: string]: any } = colNamesToDisplay;
  if (shouldAddActionButtons) {
    colNamesToDisplayWithActions["actions"] = "Actions";
  }
  //   console.log("deleteMe colNamesToDisplayWithActions is: ");
  //   console.log(colNamesToDisplayWithActions);

  const colNamesToDisplayKeys: string[] = useMemo(() => {
    return Object.keys(colNamesToDisplayWithActions) || [];
  }, [colNamesToDisplayWithActions]);

  console.log("deleteMe colNamesToDisplayKeys is: ");
  console.log(colNamesToDisplayKeys);

  const shouldFilter: boolean = useMemo(() => {
    return colNamesToDisplayKeys.length > 0;
  }, [colNamesToDisplayKeys]);

  const rows: GridRowsProp = useMemo(() => {
    return data?.map((dataRow, idx) => {
      let dataRowWithOnlyDesiredCols: { [key: string]: any } = dataRow;
      if (shouldAddActionButtons) {
        dataRowWithOnlyDesiredCols["actions"] = null;
        actionButtonsKeys.forEach((actionButtonKey) => {
          //   dataRowWithOnlyDesiredCols["actions"] = dataRowWithOnlyDesiredCols[
          //     "actions"
          //   ]
          //     ? dataRowWithOnlyDesiredCols["actions"] +
          //       generateComponent(actionButtonsToDisplay[actionButtonKey], idx)
          //     : generateComponent(actionButtonsToDisplay[actionButtonKey], idx); // @TODO this needs to add action button (e.g., view, edit) components... which in turn need guids
          dataRowWithOnlyDesiredCols["actions"] !== null ? (
            dataRowWithOnlyDesiredCols["actions"] +
            (
              <h1>Hi</h1>
              //   <ComponentWrapper
              //     as={actionButtonsToDisplay[actionButtonKey]}
              //     id={idx}
              //   />
            )
          ) : (
            <h1>Hi</h1>
            // <ComponentWrapper
            //   as={actionButtonsToDisplay[actionButtonKey]}
            //   id={idx}
            // />
          ); // @TODO this needs to add action button (e.g., view, edit) components... which in turn need guids
        });
      }
      console.log("deleteMe dataRowWithOnlyDesiredCols a1 is: ");
      console.log(dataRowWithOnlyDesiredCols);
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

  console.log("deleteMe rows is: ");
  console.log(rows);

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
    // const actionButtonCellRenderer: (cellValues: {
    //   type: any;
    //   props: {};
    // }) => any = (cellValues: { type: any; props: {} }) => {
    //   console.log("deleteMe cellValues are: ");
    //   console.log(cellValues);
    //   return <h1>Test</h1>;
    // };
    return map(prototypeRowWithOnlyDesiredCols, (el, elKey) => {
      tracker++; // tracker seems needed because I can't get both the keys and the indexes in map(obj)
      const cleanHeader: string = elKey.trim().toLowerCase();

      const headerName: string =
        colNamesToDisplay[elKey] ||
        cleanHeader.charAt(0).toUpperCase() + cleanHeader.slice(1);
      return {
        field: "col" + tracker,
        headerName: headerName,
        renderCell:
          headerName === "Actions"
            ? (params: GridRenderCellParams) => {
                console.log("deleteMe params are: ");
                console.log(params);
                return <h1>Test1</h1>;
              }
            : () => {},
        //   headerName === "Actions"
        //     ? actionButtonCellRenderer({
        //         type: EditActionButton,
        //         props: { id: "test1" },
        //       })
        //     : () => {},
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
