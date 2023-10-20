const isArray = function (a: any) {
  return Array.isArray(a);
};
const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const toCamel = (s: any) => {
  return s.replace(/([-_][a-z])/gi, ($1: any) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const to_snake = (s: any) => {
  return s.replace(/([A-Z])/g, ($1: any) => {
    return "_" + $1.toLowerCase();
  });
};

export const snakeToCamel = <T>(o: any) => {
  // leave dates as is
  if (o instanceof Date) {
    return o
  } else if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = snakeToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return snakeToCamel(i);
    });
  }

  return o as T;
};

export const camel_to_snake = <T>(o: any) => {
  // leave dates as is
  if (o instanceof Date) {
    return o.toISOString()
  } else if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach((k) => {
      n[to_snake(k)] = camel_to_snake(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return camel_to_snake(i);
    });
  }

  return o as T;
};


export const camel_to_snake_serializing_date = <T>(o: any) => {
  if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach((k) => {
      n[to_snake(k)] = camel_to_snake_serializing_date(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return camel_to_snake_serializing_date(i);
    });
  }

  return o as T;
};
