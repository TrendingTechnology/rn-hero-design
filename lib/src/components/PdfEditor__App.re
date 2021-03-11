module PropsDecoder = {
  let variableValues = json => {
    json
    |> Json.Decode.array(PdfEditor__Converter.Decoder.variableValue)
    |> Array.to_list;
  };
};

module App = {
  [@react.component]
  let make = () => <h1> "Kool!"->React.string </h1>;
};

ReactDOMRe.renderToElementWithId(
  <HD.ThemeProvider> <HD.CSSPreset /> <App /> </HD.ThemeProvider>,
  "root",
);
