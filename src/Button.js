export default function Button(props) {
  return (
    <>
      <button id={props.id}>{props.children}</button>
    </>
  );
}
