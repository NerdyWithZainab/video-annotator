export function isNonEmptyString(str: string): boolean {
  return Boolean(str);
}

export function isNonFalsy(input: any): boolean {
  return Boolean(input);
}

export function isNumber(input: any): boolean {
  return typeof input === "number";
}

export function isValidEmail(email: string): boolean {
  if (email) {
    const re: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const re: RegExp =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const re: RegExp =
    //   /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    // const re: RegExp = new RegExp(
    //   "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    // );
    return re.test(email.toLowerCase());
  } else {
    return true; // empty string should be true, because empty string will be caught by isRequired/isNonEmptyString
  }
}

export function isValidPassword(password: string): boolean {
  if (password) {
    const re: RegExp = new RegExp(
      "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{7,}$"
    );
    return re.test(password.toLowerCase());
  } else {
    return false;
  }
}

export function isValidUsername(username: string): boolean {
  return Boolean(username);
}

export function isValidName(name: string): boolean {
  return isNonEmptyString(name);
}

export function isValidStepsToReproduce(stepsToReproduce: string): boolean {
  return Boolean(stepsToReproduce);
}

export function isValidDescription(description: string): boolean {
  return Boolean(description);
}

export function isValidUrl(url: string): boolean {
  const somethingHasBeenTyped = Boolean(url);
  if (!somethingHasBeenTyped) return true; // isRequired is handled by a different validator
  const re: RegExp = new RegExp(
    "^(?:(?:(?:https?|ftp):)?//)(?:S+(?::S*)?@)?(?:(?!(?:10|127)(?:.d{1,3}){3})(?!(?:169.254|192.168)(?:.d{1,3}){2})(?!172.(?:1[6-9]|2d|3[0-1])(?:.d{1,3}){2})(?:[1-9]d?|1dd|2[01]d|22[0-3])(?:.(?:1?d{1,2}|2[0-4]d|25[0-5])){2}(?:.(?:[1-9]d?|1dd|2[0-4]d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:.(?:[a-z\u00a1-\uffff]{2,})))(?::d{2,5})?(?:[/?#]S*)?$"
  );
  return Boolean(somethingHasBeenTyped && re.test(url.toLowerCase()));
}

export function isValidOption(currentOpt: string, validOpts: string[]) {
  if (!currentOpt) return false;
  return validOpts.includes(currentOpt);
}
