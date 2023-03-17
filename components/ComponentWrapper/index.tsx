const ComponentWrapper: React.FC<{
  as: any;
  id: string | number;
  children?: any;
}> = ({ as, id, children }) => {
  const Component = as || "span";
  return <Component id={id}>{children}</Component>;
};

export default ComponentWrapper;
