export default function InputWithLabel(props) {
  const {id, children, ...rest} = props;
  return (
    <>
      <label for={id}>{children}</label>
      <input id={id} {...rest} />
    </>
  );
}
