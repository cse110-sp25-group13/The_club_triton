export function dummy() {
  return true;
}

export function localStorageDummy() {
  localStorage.setItem("isDummy", "true");
  return localStorage.getItem("isDummy") === "true";
}
