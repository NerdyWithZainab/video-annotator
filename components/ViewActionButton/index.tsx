import { Button } from "@mui/material";
const ViewActionButton: React.FC<{ id: string | number }> = (id) => {
  return <Button>ViewTODO {id}</Button>;
};

export default ViewActionButton;
