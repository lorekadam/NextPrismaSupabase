export const buildLink = (route: string, replace: string | number) =>
  route.replace(/{.*}/, replace.toString());
