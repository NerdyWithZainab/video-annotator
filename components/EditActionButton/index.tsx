import { Button } from "@mui/material";
const EditActionButton: React.FC<{ id: string | number }> = (id) => {
  return <Button>EditTODO {id}</Button>;
};

export default EditActionButton;
