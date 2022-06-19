import PAGES from "./models/pageModel.js";
import {
  onChangePage,
  setNavDisplay,
} from "./routes/router.js";
import { renderSlider } from "./components/renderSlider.js";
import { setCounter } from "./services/sliderService.js";
import initialData from "./initialData/initialData.js";
import { setItemInLocalStorage } from "./services/localStorageService.js";

import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  LINK_TO_HOME_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  SIGNUP_PAGE_LINK,
  LOGOUT_LINK,
  TABLE_ICON,
  SLIDER_ICON,
  CARDS_ICON,
  USER_EMAIL_LINK_EDIT,
  SORT_DOWN_ICON,
  SORT_UP_ICON,
  SEARCH_BAR,
  LINK_TO_SIGNUP_PAGE,
  GOTO_LINK_TO_SIGNUP_PAGE,
  NO_DATA_CONTAINER,
} from "./services/domService.js";
import {
  handleCancelCreateNewPic,
  handleCreatePic,
  onCancelEditPic,
  onCreateNewPic,
  onEditPic,
} from "./services/picService.js";
import {
  handleCancelSignup,
  handleLogin,
  handleSignup,
  onSignupNewUser,
  getUserFromLocalStorage,
  onEditUser,
  onCancelEditUser,
} from "./services/userService.js";
import { removeItemFromLocalStorage } from "./services/localStorageService.js";
import DISPLAY from "./models/displayModel.js";
import { handleDisplayMode } from "./services/displayModeService.js";
import { filterArrayOfObjectsByTerm,sortArrayOfObject, sortReverseArrayOfObject } from "./utils/algoMethods.js";

let counter = 0;
let pictures;
let users;


 const getData = async () => {
  try {
/********** יצירת משתנים גלובליים **********/
const data = await initialData();
    users = data.users;
    pictures = data.pictures;

/********** לוגיקה ***********/
const handleSliderPicChange = (controller = "") => {
  counter = setCounter(pictures, counter, controller);
  renderSlider(pictures, counter);
};

  /********** filter pictures **********/
  const handleFilterPictures = term => {
    const newPictures = filterArrayOfObjectsByTerm(term, pictures, "alt");
    handleDisplayMode(DISPLAY.TABLE, newPictures);
  };

/********** האזנה לאירועים ***********/
// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_PIC_PAGE_LINK.addEventListener("click", handleCreatePic);
SIGNUP_PAGE_LINK.addEventListener("click", handleSignup);
LOGIN_PAGE_LINK.addEventListener("click", () => handleLogin(users));
LOGOUT_LINK.addEventListener("click", () => {
  removeItemFromLocalStorage("user");
  USER_EMAIL_LINK_EDIT.innerHTML = "";
  setNavDisplay();
  handleDisplayMode(DISPLAY.SLIDER, pictures)
  onChangePage(PAGES.LOGIN);
});

LINK_TO_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

// מצגת תמונות
SLIDER_PREV_BTN.addEventListener("click", () => handleSliderPicChange("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => handleSliderPicChange("next"));

// Display Mode
TABLE_ICON.addEventListener("click", () =>
  handleDisplayMode(DISPLAY.TABLE, pictures)
);

SLIDER_ICON.addEventListener("click", () =>
  handleDisplayMode(DISPLAY.SLIDER, pictures)
);
CARDS_ICON.addEventListener("click", () =>
  handleDisplayMode(DISPLAY.CARDS, pictures)
);

SORT_DOWN_ICON.addEventListener("click", () => {
  handleDisplayMode(DISPLAY.TABLE, pictures);
  pictures = sortArrayOfObject(pictures, "alt");
  
});

SORT_UP_ICON.addEventListener("click", () => {
  pictures = sortReverseArrayOfObject(pictures, "alt");
  handleDisplayMode(DISPLAY.TABLE, pictures);
}
);

// שדה חיפוש
SEARCH_BAR.addEventListener("input", e =>
  handleFilterPictures(e.target.value)
);

/********** user render ***********/

USER_EMAIL_LINK_EDIT.addEventListener("click", () =>{
  onChangePage(PAGES.USER);
  getUserFromLocalStorage(users);
} 
);

const userRegister = () =>{
  LINK_TO_SIGNUP_PAGE.addEventListener("click", () =>{onChangePage(PAGES.SIGN_UP)}
);
};

const goTouserRegister = () =>{
  GOTO_LINK_TO_SIGNUP_PAGE.addEventListener("click", () =>{onChangePage(PAGES.HOME)}
); 
};

const noData = () =>{
  NO_DATA_CONTAINER.addEventListener("click", () =>{
    onChangePage(PAGES.HOME)
    handleDisplayMode(DISPLAY.TABLE, pictures);
  }
  );
};

/********** אתחול ראשוני ***********/
noData();
goTouserRegister();
userRegister();
handleSliderPicChange();
setNavDisplay();
onChangePage(PAGES.HOME)
handleDisplayMode(DISPLAY.SLIDER, pictures);
} catch (error) {
  console.log(error);
}
};

getData();

/********* Create Picture **********/
export const handleSubmitNewPic = () => {
  pictures = onCreateNewPic(pictures);
  handleCancelCreateNewPic();
  handleDisplayMode(DISPLAY.TABLE, pictures); 
};


/********** Delete pictures **********/
export const handleDeletePic = (id) => {
  pictures = pictures.filter((pic) => pic._id !== id)
  handleDisplayMode(DISPLAY.TABLE, pictures)
  };


/********** Edit picture **********/
export const onSubmitEditPic = id => {
  pictures = onEditPic(pictures, id);
  onCancelEditPic(pictures);
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********** Signup new User **********/
export const handleSubmitSignup = () => {
  users = onSignupNewUser(users);
  handleCancelSignup();
  onChangePage(PAGES.HOME);
};


/********** Edit user **********/
export const onSubmitEditUser = (users,id) => {
  users = onEditUser(users,id);
  // users = getUserFromLocalStorage(users,id);
  
  onCancelEditUser(users);
  handleDisplayMode(PAGES.USER, users);
};



