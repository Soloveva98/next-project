import React from "react";
import { FormInput, WhiteBlock } from "..";
import { cn } from "@/shared/utils";

interface Props {
	className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональные данные" className={cn(className)}>
			<div className="grid grid-cols-2 gap-5">
				<FormInput
					name="firstName"
					required
					className="text-base"
					placeholder="Имя"
				/>
				<FormInput
					name="lastName"
					required
					className="text-base"
					placeholder="Фамилия"
				/>
				<FormInput
					name="email"
					required
					className="text-base"
					placeholder="E-mail"
				/>
				<FormInput
					name="phone"
					required
					className="text-base"
					placeholder="Телефон"
				/>
			</div>
		</WhiteBlock>
	);
};
