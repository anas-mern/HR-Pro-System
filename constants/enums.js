const GENDER = { Male: "Male", Female: "Female" };
const ROLE = { Admin: 1, Employee: 2 };
const EXCEPTION_TYPE = { Leave: "leave", Late: "late" };
const REQUEST_TYPE = {
  Loan: "loan",
  Resign: "resign",
  Leave: "leave",
  Exception: "exception",
};
const RESPOND = { Approve: "approve", Reject: "reject" };
const ACTION_TYPE = { Deduction: "deduction", Commission: "commission" };

const userFields = [
  "username",
  "email",
  "password",
  "salary",
  "KPIs",
  "address",
  "gender",
  "nationality",
  "nationId",
  "age",
  "position",
  "role",
  "leave_days",
  "phone_num",
  "join_date",
  "break_time",
];

module.exports = {
  GENDER,
  ROLE,
  EXCEPTION_TYPE,
  REQUEST_TYPE,
  RESPOND,
  ACTION_TYPE,
  userFields,
};
