"use client";

import React from "react";
import { AddressInputClient, ErrorText, FormTextarea, WhiteBlock } from "..";
import { cn } from "@/shared/utils";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock title="3. Адрес доставки" className={cn(className)}>
			<div className="flex flex-col gap-3">
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => (
						<>
							<AddressInputClient onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					name="comment"
					className="text-base"
					placeholder="Комментарий к заказу"
					rows={5}
				/>
			</div>
		</WhiteBlock>
	);
};
