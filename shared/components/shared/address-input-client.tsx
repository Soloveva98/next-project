"use client";

import dynamic from "next/dynamic";
import "react-dadata/dist/react-dadata.css";

export const AddressInputClient = dynamic(
	() => import("./address-input").then((mod) => mod.AddressInput),
	{
		ssr: false,
		loading: () => (
			<div className="h-12 bg-gray-100 animate-pulse rounded" />
		),
	},
);
