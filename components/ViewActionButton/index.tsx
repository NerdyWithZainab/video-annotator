import { Button } from "@mui/material";
const ViewActionButton: React.FC<{ props: { id: string | number } }> = (
  props
) => {
  console.log("deleteMe props is: ");
  console.log(props);
  return <Button>ViewTODO {props?.id}</Button>;

  //   return <h1>Got here</h1>;
};

export default ViewActionButton;
