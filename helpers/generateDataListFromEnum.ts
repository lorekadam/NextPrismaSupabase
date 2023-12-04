export const generateDataListFromEnum = (source_enum: Object) =>
  Object.entries(source_enum).map(([value]) => ({
    value,
    label: value.replace(/_/g, '-').toLocaleLowerCase(),
  }));
