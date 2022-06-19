import useForm from "../services/formService.js";
const { onChangeInputField, onClearFormFields } = useForm();
import PAGES from "../models/pageModel.js";
import { onChangePage, setNavDisplay } from "../routes/router.js";
import User from "../models/UserModel.js";
import { getItemFromLocalStorage } from "../services/localStorageService.js";
import { handleDisplayMode } from "../services/displayModeService.js";
import {
  EMAIL_LOGIN_FIELD,
  EMAIL_LOGIN_ERROR,
  PASSWORD_LOGIN_FIELD,
  PASSWORD_LOGIN_ERROR,
  SUBMIT_LOGIN_BTN,
  CANCEL_LOGIN_BTN,
  BIZ_SIGNUP_FIELD,
  CANCEL_BTN_SIGNUP,
  CITY_SIGNUP_ERROR,
  CITY_SIGNUP_FIELD,
  COUNTRY_SIGNUP_ERROR,
  COUNTRY_SIGNUP_FIELD,
  EMAIL_SIGNUP_ERROR,
  EMAIL_SIGNUP_FIELD,
  FIRST_SIGNUP_ERROR,
  FIRST_SIGNUP_FIELD,
  HOUSE_SIGNUP_ERROR,
  HOUSE_SIGNUP_FIELD,
  LAST_SIGNUP_ERROR,
  LAST_SIGNUP_FIELD,
  PASSWORD_RE_ENTER_SIGNUP_ERROR,
  PASSWORD_RE_ENTER_SIGNUP_FIELD,
  PASSWORD_SIGNUP_ERROR,
  PASSWORD_SIGNUP_FIELD,
  PHONE_SIGNUP_ERROR,
  PHONE_SIGNUP_FIELD,
  STATE_SIGNUP_ERROR,
  STATE_SIGNUP_FIELD,
  STREET_SIGNUP_ERROR,
  STREET_SIGNUP_FIELD,
  SUBMIT_BTN_SIGNUP,
  ZIP_SIGNUP_ERROR,
  ZIP_SIGNUP_FIELD,
  FIRST_SIGNUP_FIELD_EDIT,
  LAST_SIGNUP_FIELD_EDIT,
  STATE_SIGNUP_FIELD_EDIT,
  COUNTRY_SIGNUP_FIELD_EDIT,
  CITY_SIGNUP_FIELD_EDIT,
  STREET_SIGNUP_FIELD_EDIT,
  HOUSE_SIGNUP_FIELD_EDIT,
  ZIP_SIGNUP_FIELD_EDIT,
  EMAIL_SIGNUP_FIELD_EDIT,
  PHONE_SIGNUP_FIELD_EDIT,
  PASSWORD_SIGNUP_FIELD_EDIT,
  PASSWORD_RE_ENTER_SIGNUP_FIELD_EDIT,
  BIZ_SIGNUP_FIELD_EDIT,
  FIRST_SIGNUP_ERROR_EDIT,
  LAST_SIGNUP_ERROR_EDIT,
  STATE_SIGNUP_ERROR_EDIT,
  COUNTRY_SIGNUP_ERROR_EDIT,
  STREET_SIGNUP_ERROR_EDIT,
  CITY_SIGNUP_ERROR_EDIT,
  HOUSE_SIGNUP_ERROR_EDIT,
  ZIP_SIGNUP_ERROR_EDIT,
  EMAIL_SIGNUP_ERROR_EDIT,
  PHONE_SIGNUP_ERROR_EDIT,
  PASSWORD_SIGNUP_ERROR_EDIT,
  PASSWORD_RE_ENTER_SIGNUP_ERROR_EDIT,
  SUBMIT_EDIT_USER_BTN,
  CANCELֹ_EDIT_USER_BTN,
} from "./domService.js";
import { handleSubmitSignup, onSubmitEditUser } from "../app.js";
import { setItemInLocalStorage } from "./localStorageService.js";

window.user = {};

/********** Signup **********/
const createUserListeners = () => {
  const schema = ["first", "last", "email", "password", "passwordReEnter"];

  FIRST_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: FIRST_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  LAST_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: LAST_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  STATE_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: STATE_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  COUNTRY_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: COUNTRY_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  CITY_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: CITY_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  STREET_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: STREET_SIGNUP_ERROR,
        validation: { min: 2 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  HOUSE_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: HOUSE_SIGNUP_ERROR,
        validation: { min: 1 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  ZIP_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: ZIP_SIGNUP_ERROR,
        validation: { min: 4 },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  EMAIL_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: EMAIL_SIGNUP_ERROR,
        validation: {
          regex: {
            regex: /.+@.+\..{2,}/g,
            message: "Please enter a valid email",
          },
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  PHONE_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PHONE_SIGNUP_ERROR,
        validation: {
          regex: {
            regex: /^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g,
            message: "Please enter a valid phone number",
          },
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  PASSWORD_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PASSWORD_SIGNUP_ERROR,
        validation: {
          regex: {
            regex:
              /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
            message:
              "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
          },
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );

  PASSWORD_RE_ENTER_SIGNUP_FIELD.addEventListener("input", e =>
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: PASSWORD_RE_ENTER_SIGNUP_ERROR,
        validation: {
          min: 2,
          regex: {
            regex:
              /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
            message:
              "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
          },
        },
      },
      SUBMIT_BTN_SIGNUP
    )
  );
};

export const handleSignup = () => {
  onChangePage(PAGES.SIGN_UP);
  createUserListeners();
  CANCEL_BTN_SIGNUP.addEventListener("click", handleCancelSignup);
  SUBMIT_BTN_SIGNUP.addEventListener("click", handleSubmitSignup);
};

export const handleCancelSignup = () => {
  const fields = [
    FIRST_SIGNUP_FIELD,
    LAST_SIGNUP_FIELD,
    STATE_SIGNUP_FIELD,
    COUNTRY_SIGNUP_FIELD,
    CITY_SIGNUP_FIELD,
    STREET_SIGNUP_FIELD,
    HOUSE_SIGNUP_FIELD,
    ZIP_SIGNUP_FIELD,
    PHONE_SIGNUP_FIELD,
    EMAIL_SIGNUP_FIELD,
    PASSWORD_SIGNUP_FIELD,
    PASSWORD_RE_ENTER_SIGNUP_FIELD,
  ];
  const errorSpans = [
    FIRST_SIGNUP_ERROR,
    LAST_SIGNUP_ERROR,
    STATE_SIGNUP_ERROR,
    COUNTRY_SIGNUP_ERROR,
    CITY_SIGNUP_ERROR,
    STREET_SIGNUP_ERROR,
    HOUSE_SIGNUP_ERROR,
    ZIP_SIGNUP_ERROR,
    EMAIL_SIGNUP_ERROR,
    PHONE_SIGNUP_ERROR,
    PASSWORD_SIGNUP_ERROR,
    PASSWORD_RE_ENTER_SIGNUP_ERROR,
  ];
  onClearFormFields(SUBMIT_BTN_SIGNUP, fields, errorSpans);
  BIZ_SIGNUP_FIELD.checked = false;
  onChangePage(PAGES.HOME);
};

export const onSignupNewUser = array => {
  let newArray = [...array];
  const isChecked = BIZ_SIGNUP_FIELD.checked;
  let user = {
    name: {
      first: FIRST_SIGNUP_FIELD.value,
      last: LAST_SIGNUP_FIELD.value,
    },
    address: {
      state: STATE_SIGNUP_FIELD.value ? STATE_SIGNUP_FIELD.value : "",
      country: COUNTRY_SIGNUP_FIELD.value ? COUNTRY_SIGNUP_FIELD.value : "",
      city: CITY_SIGNUP_FIELD.value ? CITY_SIGNUP_FIELD.value : "",
      street: STREET_SIGNUP_FIELD.value ? STREET_SIGNUP_FIELD.value : "",
      houseNumber: HOUSE_SIGNUP_FIELD.value ? HOUSE_SIGNUP_FIELD.value : "",
      zip: ZIP_SIGNUP_FIELD.value ? ZIP_SIGNUP_FIELD.value : "",
    },
    phone: PHONE_SIGNUP_FIELD.value ? PHONE_SIGNUP_FIELD.value : "050-0000000",
    email: EMAIL_SIGNUP_FIELD.value,
    password: PASSWORD_SIGNUP_FIELD.value,
    isBusiness: isChecked ? true : false,
  };
  user = new User(user, array);
  newArray.push(user);
  return newArray;
};

/********** Login **********/
export const loginListeners = () => {
  const schema = ["login-email", "login-password"];
  EMAIL_LOGIN_FIELD.addEventListener("input", e => {
    const validation = {
      regex: {
        regex: /.+@.+\..{2,}/g,
        message: "Please enter a valid email",
      },
    };

    const element = {
      input: e.target,
      errorSpan: EMAIL_LOGIN_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_LOGIN_BTN);
  });

  PASSWORD_LOGIN_FIELD.addEventListener("input", e => {
    const validation = {
      regex: {
        regex:
          /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
        message:
          "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
      },
    };

    const element = {
      input: e.target,
      errorSpan: PASSWORD_LOGIN_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_LOGIN_BTN);
  });
};

export const handleLogin = users => {
  onChangePage(PAGES.LOGIN);
  loginListeners();
  CANCEL_LOGIN_BTN.addEventListener("click", handleCancelLogin);
  SUBMIT_LOGIN_BTN.addEventListener("click", () => {
    try {
      
      onLogin(EMAIL_LOGIN_FIELD.value, PASSWORD_LOGIN_FIELD.value, users);
    } catch (error) {
      PASSWORD_LOGIN_ERROR.innerHTML = error.message;
    }
  });
};

export const handleCancelLogin = () => {
  const fields = [EMAIL_LOGIN_FIELD, PASSWORD_LOGIN_FIELD];
  const errorSpans = [EMAIL_LOGIN_ERROR, PASSWORD_LOGIN_ERROR];
  onClearFormFields(SUBMIT_LOGIN_BTN, fields, errorSpans);
  onChangePage(PAGES.HOME);
};

export const onLogin = (email, password, users = []) => {
  if (!users.length) throw new Error("You are not registered please signup!");
  const user = users.find(user => user.email === email);
  if (!user) throw new Error("User mail or password is incorrect!");
  if (user.password !== password)
    throw new Error("User mail or password is incorrect!");
  
  const { _id, isAdmin, isBusiness,name, phone, address} = user;
  const payload = JSON.stringify({ _id, isAdmin, isBusiness,name, phone, address, email,password });
  setItemInLocalStorage("user",payload);
  handleCancelLogin();
  setNavDisplay();
}; 

export const getUserFromLocalStorage = (users) => {
  const token = getItemFromLocalStorage("user");
  const userLocalStorage = JSON.parse(token);
  const user = users.filter((user) => {
    return user.email === userLocalStorage.email
  })
  FIRST_SIGNUP_FIELD_EDIT.value = user[0].first;
  LAST_SIGNUP_FIELD_EDIT.value = user[0].last;
  STATE_SIGNUP_FIELD_EDIT.value = user[0].address.state;
  COUNTRY_SIGNUP_FIELD_EDIT.value = user[0].address.country;
  CITY_SIGNUP_FIELD_EDIT.value = user[0].address.city;
  STREET_SIGNUP_FIELD_EDIT.value = user[0].address.street;
  HOUSE_SIGNUP_FIELD_EDIT.value = user[0].address.houseNumber;
  ZIP_SIGNUP_FIELD_EDIT.value = user[0].address.zip;
  EMAIL_SIGNUP_FIELD_EDIT.value = user[0].email;
  PHONE_SIGNUP_FIELD_EDIT.value = user[0].phone;
  PASSWORD_SIGNUP_FIELD_EDIT.value = user[0].password;
  PASSWORD_RE_ENTER_SIGNUP_FIELD_EDIT.value = user[0].password;
  BIZ_SIGNUP_FIELD_EDIT.value = user[0].isBusiness;    

  handleEditUser(users, user[0]._id);
};

/********* Edit User **********/
const editUserListeners = () =>{
  const schema = [ "id","isAdmin", "isBusiness","name", "phone", "address", "email", "password"];
  const handelIdEditchange = (e) => {
    onChangeInputField(
      schema,
      {
        input: e.target,
        errorSpan: FIRST_SIGNUP_ERROR_EDIT,
        validation: {min: 2} 
      },
      SUBMIT_EDIT_USER_BTN
    )
  };

  FIRST_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  handelIdEditchange(e));

  LAST_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  handelIdEditchange(e));

  STATE_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>{
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: STATE_SIGNUP_ERROR_EDIT,
      validation: {min: 2} 
    },
    SUBMIT_EDIT_USER_BTN
    )
  });
  
  COUNTRY_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: COUNTRY_SIGNUP_ERROR_EDIT,
      validation: {min: 2} 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );
  
  CITY_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: CITY_SIGNUP_ERROR_EDIT,
      validation: {min: 2} 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );

  STREET_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: STREET_SIGNUP_ERROR_EDIT,
      validation: {min: 2} 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );

  HOUSE_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: HOUSE_SIGNUP_ERROR_EDIT,
      validation: {min: 2} 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );

  ZIP_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: ZIP_SIGNUP_ERROR_EDIT,
      validation: {min: 2} 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );

  EMAIL_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: EMAIL_SIGNUP_ERROR_EDIT,
      validation: {
        regex: {
          regex: /.+@.+\..{2,}/g,
          message: "Please enter a valid email",
        }, 
      } 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );
  
  PHONE_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: PHONE_SIGNUP_ERROR_EDIT,
      validation: {min: 2} 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );

  PASSWORD_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: PASSWORD_SIGNUP_ERROR_EDIT,
      validation: {
        min: 2,
          regex: {
            regex:
              /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
            message:
              "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
          },
      } 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );

  PASSWORD_RE_ENTER_SIGNUP_FIELD_EDIT.addEventListener("input", (e) =>
  onChangeInputField(
    schema,
    {
      input: e.target,
      errorSpan: PASSWORD_RE_ENTER_SIGNUP_ERROR_EDIT,
      validation: {
        min: 2,
          regex: {
            regex:
              /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
            message:
              "The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-",
          },
      } 
    },
    SUBMIT_EDIT_USER_BTN
    )
  );
};

export const handleEditUser = (users, id) => {
  onChangePage(PAGES.USER);
  mapTomodelUser(users, id);
  editUserListeners();
  document
   .getElementById("submit-signup-user-btn-edit")
   .removeEventListener("click", () =>handleEditUser(users,id));
   SUBMIT_EDIT_USER_BTN.addEventListener("click", () => {onSubmitEditUser(users,id)});
   CANCELֹ_EDIT_USER_BTN.addEventListener("click", onCancelEditUser);
};

export const mapTomodelUser = (users,id) => {
  let user = users.find((user) => user._id === id);
  if(!user) throw new Error("Opss.... ther is no user with this id: " + id)
  const { isBusiness,name,_id, isAdmin, phone, address, email,password} = user;
  data = {name,_id, isAdmin, isBusiness, phone, address, email};
  FIRST_SIGNUP_FIELD_EDIT.value = data.first;
  LAST_SIGNUP_FIELD_EDIT.value = data.last;
  STATE_SIGNUP_FIELD_EDIT.value = data.address.state;
  COUNTRY_SIGNUP_FIELD_EDIT.value = data.address.country;
  CITY_SIGNUP_FIELD_EDIT.value = data.address.city;
  STREET_SIGNUP_FIELD_EDIT.value = data.address.street;
  HOUSE_SIGNUP_FIELD_EDIT.value = data.address.houseNumber;
  ZIP_SIGNUP_FIELD_EDIT.value = data.address.zip;
  EMAIL_SIGNUP_FIELD_EDIT.value = email;
  PHONE_SIGNUP_FIELD_EDIT.value = phone;
  PASSWORD_SIGNUP_FIELD_EDIT.value = password;
  PASSWORD_RE_ENTER_SIGNUP_FIELD_EDIT.value = password;
  BIZ_SIGNUP_FIELD_EDIT.value = isBusiness; 
  SUBMIT_EDIT_USER_BTN.addEventListener("click", () => {onSubmitEditUser(users,_id)});
};

export const onCancelEditUser = () => {
  const errorSpans =[
    FIRST_SIGNUP_ERROR_EDIT,
    LAST_SIGNUP_ERROR_EDIT,
    STATE_SIGNUP_ERROR_EDIT,
    COUNTRY_SIGNUP_ERROR_EDIT,
    CITY_SIGNUP_ERROR_EDIT,
    HOUSE_SIGNUP_ERROR_EDIT,
    ZIP_SIGNUP_ERROR_EDIT,
    EMAIL_SIGNUP_ERROR_EDIT,
    PHONE_SIGNUP_ERROR_EDIT,
    PASSWORD_SIGNUP_ERROR_EDIT,
    PASSWORD_RE_ENTER_SIGNUP_ERROR_EDIT,
  ];
  onClearFormFields(SUBMIT_EDIT_USER_BTN, [], errorSpans);
  onChangePage(PAGES.USER);
  handleDisplayMode(DISPLAY.SLIDER, pictures);
  
};

export const onEditUser = (users,id) => {
  user.first = FIRST_SIGNUP_FIELD_EDIT.value;
  user.last = LAST_SIGNUP_FIELD_EDIT.value;
  user.state = STATE_SIGNUP_FIELD_EDIT.value;
  user.country = COUNTRY_SIGNUP_FIELD_EDIT.value;
  user.city = CITY_SIGNUP_FIELD_EDIT.value;
  user.street = STREET_SIGNUP_FIELD_EDIT.value;
  user.houseNumber = HOUSE_SIGNUP_FIELD_EDIT.value;
  user.zip = ZIP_SIGNUP_FIELD_EDIT.value;
  user.email = EMAIL_SIGNUP_FIELD_EDIT.value;
  user.phone = PHONE_SIGNUP_FIELD_EDIT.value;
  user.password = PASSWORD_SIGNUP_FIELD_EDIT.value;
  user.password = PASSWORD_RE_ENTER_SIGNUP_FIELD_EDIT.value;
  user.isBusiness = BIZ_SIGNUP_FIELD_EDIT.value;
  onCancelEditUser();
  return users;
};

