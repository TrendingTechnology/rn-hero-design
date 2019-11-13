const isNil = val => val == null;

const merge = (obj1, obj2) =>
  isNil(obj2)
    ? obj1
    : Object.keys(obj2).reduce(
        (res, key) => (isNil(obj2[key]) ? res : { ...res, [key]: obj2[key] }),
        obj1,
      );

export default (styles = []) => styles.reduce(merge, {});
