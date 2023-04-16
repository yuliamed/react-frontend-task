export function printFIO(USER) {
  let FIO = "";
  if (USER.surname !== null || USER.surname !== undefined) {
    FIO += USER.surname + " ";
  }
  if (USER.name !== null || USER.name !== undefined) {
    FIO += USER.name + " ";
  }
  if (USER.patronymic !== null || USER.patronymic != undefined) {
    FIO += USER.patronymic + " ";
  }
  return FIO;
}