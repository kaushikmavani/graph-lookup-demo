const messages = {
  // Something went wrong
  somethingWrong: "Something went wrong, please try again later.",

  // Error Handler
  unexpectedError: "An unexpected network error occurred, please try again later.",
  invalidEndpointOrMethod: "Please enter valid endpoint and method.",

  // Middlewares
  invalidToken: "You are not authorized to access associated web-services, Please enter valid token.",

  // Auth
  emailNotRegistered: "This email is not registered with us. Please use correct email address.",
  emailAlreadyRegistered: "This email is already registered with us. Please try another email.",
  invalidPassword: "Your password is incorrect.",
  emailNotConfirmed: "Please click on confirmation link sent to your registered email.",
  loginSuccessful: "Login success.",

  // User
  getAllUsersSuccessful: "Get all users successfully.",
  getUserSuccessful: "Get user successfully.",
  invalidUserId: "Please enter valid user ID.",
  invalidParentUserId: "Please enter valid parent user id",
  parentUserIsNotSameUser: "You cannot pass same user id as a parent user id",
  notDeletableDueParentUser: "You cannot delete user because it's already other user's parent",
  userCreatedSuccessful: "User created successfully.",
  userUpdatedSuccessful: "User udpated successfully.",
  userDeletedSuccessful: "User deleted successfully.",

  // Validation Message
  idRequired: "Id is required",
  nameRequired: "Name is required.",
  emailRequired: "Email is required.",
  passwordRequired: "Password is required.",
  passwordMinSix: "Password must contain at least 6 character.",

  invalidId: "Please enter valid id",
  invalidEmail: "Please enter valid email address.",

  // Pagination
  invalidPage: "Please enter valid page.",
  invalidLimit: "Please enter valid limit.",
}

export default messages
