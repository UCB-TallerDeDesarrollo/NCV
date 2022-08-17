export default function InputWithLabel(props) {
  const {id, children, ...rest} = props;
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input id={id} {...rest} />
    </>
  );
}
