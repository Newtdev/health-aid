/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface DashboardWrapperType {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: React.ReactElement | any;
}

export interface InputErrorType {
	name: string;
	error: unknown;
}

export interface LinksType {
	name: string;
	links: string;
	icon: any;
}
