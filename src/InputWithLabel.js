export default function InputWithLabel(props) {
  return (
    <>
      <label for={props.id}>{props.children}</label>
      <input type={props.type} id={props.id}></input>
    </>
  );
}
