import EditIcon from "@mui/icons-material/Edit";
const EditActionButton: React.FC<{ props: { id: string | number } }> = (
  props
) => {
  // @TODO add button click handler and possibly prevent propagation
  return <EditIcon />;
};

export default EditActionButton;
