open PdfEditor.Types;

let pdfWorkerUrl: string =
  "https://unpkg.com/pdfjs-dist@"
  ++ PdfEditor__Reader.Pdfjs.version
  ++ "/es5/build/pdf.worker.js";

PdfEditor__Reader.Pdfjs.setSrc(
  PdfEditor__Reader.Pdfjs.globalWorker,
  pdfWorkerUrl,
);

let markup: Markup.t = {bold: false, italic: false, underline: false};

let noop: 'a => unit = _ => ();

/* TODO: this should access json data from global var, then decode it */
let initVariableValues =
  VariableValue.[
    {
      id: "100",
      formatting:
        Formatting.{
          fontSize: `Px13,
          fontFamily: `TimesRoman,
          color: PdfEditor__Config.Settings.defaultTextColor,
          dateFormat: None,
          markup,
        },
      location: Location.{left: 125, top: 163, page: 1},
      variableId: "1",
      variableName: "First Name",
      area: None,
      placeholder: "[first_name]",
      inputValue: Validated(String("Alberto")),
    },
    {
      id: "666",
      formatting:
        Formatting.{
          fontSize: `Px13,
          fontFamily: `TimesRoman,
          color: PdfEditor__Config.Settings.defaultTextColor,
          dateFormat: None,
          markup,
        },
      location: Location.{left: 125, top: 183, page: 1},
      variableId: "2",
      variableName: "Last Name",
      area: None,
      placeholder: "[last_name]",
      inputValue: Unvalidated(String(None)),
    },
    {
      id: "667",
      formatting:
        Formatting.{
          fontSize: `Px13,
          fontFamily: `TimesRoman,
          color: PdfEditor__Config.Settings.defaultTextColor,
          dateFormat: None,
          markup,
        },
      location: Location.{left: 125, top: 213, page: 1},
      variableId: "4",
      variableName: "none signature pad",
      area: None,
      placeholder: "[none_signature_pad]",
      inputValue: Unvalidated(SignaturePad(None)),
    },
    {
      id: "668",
      formatting:
        Formatting.{
          fontSize: `Px13,
          fontFamily: `TimesRoman,
          color: PdfEditor__Config.Settings.defaultTextColor,
          dateFormat: None,
          markup,
        },
      location: Location.{left: 125, top: 283, page: 1},
      variableId: "4",
      variableName: "Some signature pad",
      area: Some({width: 180, height: 80}),
      placeholder: "[some_signature_pad]",
      inputValue:
        Unvalidated(
          SignaturePad(
            Some({
              url: "https://purepng.com/public/uploads/medium/hello-p4g.png",
              fileType: `Png,
            }),
          ),
        ),
    },
    {
      id: "669",
      formatting:
        Formatting.{
          fontSize: `Px13,
          fontFamily: `TimesRoman,
          color: PdfEditor__Config.Settings.defaultTextColor,
          dateFormat: None,
          markup,
        },
      location: Location.{left: 125, top: 313, page: 1},
      variableId: "6",
      variableName: "None Image",
      area: None,
      placeholder: "[none image]",
      inputValue: Unvalidated(Image(None)),
    },
    {
      id: "670",
      formatting:
        Formatting.{
          fontSize: `Px13,
          fontFamily: `TimesRoman,
          color: PdfEditor__Config.Settings.defaultTextColor,
          dateFormat: None,
          markup,
        },
      location: Location.{left: 125, top: 383, page: 1},
      variableId: "6",
      variableName: "Some Image",
      area: Some({width: 80, height: 80}),
      placeholder: "[some image]",
      inputValue:
        Unvalidated(
          Image(
            Some({
              url: "https://employmenthero.com/wp-content/uploads/2019/08/Employment_Hero_Team-1-1200x750.jpg",
              fileType: `Png,
            }),
          ),
        ),
    },
    {
      id: "671",
      formatting:
        Formatting.{
          fontSize: `Px13,
          fontFamily: `TimesRoman,
          color: PdfEditor__Config.Settings.defaultTextColor,
          dateFormat: Some(PdfEditor__Config.Settings.defaultDateFormat),
          markup,
        },
      location: Location.{left: 375, top: 383, page: 1},
      variableId: "6",
      variableName: "None date",
      area: None,
      placeholder: "[none date]",
      inputValue: Unvalidated(Date(None)),
    },
  ];

module PropsDecoder = {
  let variableValues = json => {
    json
    |> Json.Decode.array(PdfEditor__Converter.Decoder.variableValue)
    |> Array.to_list;
  };
};

let file = "https://19of32x2yl33s8o4xza0gf14-wpengine.netdna-ssl.com/wp-content/uploads/Exhibit-A-SAMPLE-CONTRACT.pdf";

module App = {
  [@react.component]
  let make = () => {
    let featureToggle: FeatureToggle.t = {
      dateFormatCustomization: false,
      textColorCustomization: false,
      dropzoneBorder: false,
      pageScrolling: true,
      standardDropdownField: false,
    };

    <PdfEditor.Editor
      onChange=noop
      mode=EditorMode.MobileView
      variables=[]
      variableValues=initVariableValues
      file
      featureToggle
      toolbarItems=[]
    />;
  };
};

ReactDOMRe.renderToElementWithId(
  <HD.ThemeProvider> <HD.CSSPreset /> <App /> </HD.ThemeProvider>,
  "root",
);
