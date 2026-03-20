"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
	onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token="c35f339bd8d6b764f438df459c0c8000c48a9afc"
			onChange={(data) => onChange?.(data?.value)}
			inputProps={{
				style: {
					borderRadius: "12px",
					borderColor: "#e6e6e6",
					height: "48px",
				},
				placeholder: "Введите адрес доставки",
			}}
		/>
	);
};
