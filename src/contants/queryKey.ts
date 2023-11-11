export enum QUERY_KEY {
	LOGIN = "LOGIN",
	USER = "USER",
	WALLET = "WALLET",
}


export const APPOINTMENT_TYPE: { [x: string]: string } = {
	home_visit: "Home Visit",
	clinic_visit: "Clinic Visit",
	tele_health: "Tele health",
};

export const STATUS: { [x: string]: string } = {
	pending: "text-yellow-600",
	success: "text-green-600",
	failed: "text-red-600",
};
