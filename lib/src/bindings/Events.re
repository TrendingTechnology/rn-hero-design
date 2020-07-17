type t;

type eventName = string;

type arguments = option(Js.Json.t);

type listener = arguments => unit;

[@bs.module "events"] [@bs.new] external eventEmitter: unit => t = "default";

[@bs.send] external on: (t, eventName, listener) => unit = "on";

[@bs.send] external off: (t, eventName, listener) => unit = "off";

[@bs.send] external emit: (t, eventName, arguments) => unit = "emit";

let on' = (emitter, eventName, listener) => {
  on(emitter, eventName, listener);
  () => off(emitter, eventName, listener);
};
