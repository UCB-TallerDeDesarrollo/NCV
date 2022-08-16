export default function Button(props) {
  const {children, ...rest} = props;
  return (
    <>
      <button {...rest}>{children}</button>
    </>
  );
}
