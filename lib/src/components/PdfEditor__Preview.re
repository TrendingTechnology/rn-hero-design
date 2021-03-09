open PdfEditor.Types;

type editorProps = {
  file: string,
  variableValues: Js.Json.t,
};

[@react.component]
let make = () => <h1> "Hello"->React.string </h1>;

let default = make;
