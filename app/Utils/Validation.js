export function validateEmail(email) {
  const e = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return e.test(String(email));
}

export function validationPassword(password) {
  const p = /^(?=.*\d)[0-9a-zA-Z]{8,}$/;
  return p.test(String(password));
}

export function validationRepitPassword(repitPassword) {
  const pr = /^(?=.*\d)[0-9a-zA-Z]{8,}$/;
  return pr.test(String(repitPassword));
}
