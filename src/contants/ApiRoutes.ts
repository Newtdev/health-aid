export enum API_ROUTES {
	LOGIN = "auth/login",
	REGISTER = "auth/create",
	VERIFY = "auth/verify",
	FORGOT_PASSWORD = "auth/request-reset",
	RESET_PASSWORD = "auth/reset",
	GET_USER_DETAILS = "user/update",
	USER_WALLET = "wallet/transactions",
	PAYMENT_PAYSTACK = "wallet/create-charge",
	APPOINTMENTS = "schedule/create",
	APPOINTMENTS_LIST = "schedule/all",
	UPDATE_PASSWORD = "user/change-password",
}
