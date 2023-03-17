import { Button } from "@mui/material";
const EditActionButton: React.FC<{ props: { id: string | number } }> = (
  props
) => {
  console.log("deleteMe got here b1");
  console.log("deleteMe props is: ");
  console.log(props);
  return (
    // <h1>Got here</h1>
    <Button>
      <span>EditTODO {props?.id}</span>
    </Button>
  );
};

export default EditActionButton;
