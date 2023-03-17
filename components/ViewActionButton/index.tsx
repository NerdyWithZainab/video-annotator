import ViewIcon from "@mui/icons-material/Launch";
const ViewActionButton: React.FC<{ props: { id: string | number } }> = (
  props
) => {
  // @TODO add button click handler and possibly prevent propagation
  const handleViewClick = async () => {
    // console.log("deleteMe got here handleViewClick entered");
  };
  return <ViewIcon onClick={handleViewClick} />;
};

export default ViewActionButton;
