"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title,
} from "@/components/index";
import { CheckoutFormValues, checkoutFormSchema } from "@/shared/constants";
import { useCart } from "@/shared/hooks";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
	const [submitting, setSubmitting] = useState(false);
	const { totalAmount, loading } = useCart();
	const { data: session } = useSession();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			address: "",
			phone: "",
			comment: "",
		},
	});

	useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullName.split(" ");

			form.setValue("firstName", firstName);
			form.setValue("lastName", lastName);
			form.setValue("email", data.email);
		}

		if (session) {
			fetchUserInfo();
		}
	}, [session]);

	const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
		try {
			setSubmitting(true);
			const url = await createOrder(data);

			toast.success(
				"Заказ успешно оформлен! Переход на страницу оплаты...",
				{
					icon: "✅",
				},
			);

			if (url) {
				location.href = url;
			}
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			toast.error("Не удалось создать заказ", {
				icon: "❌",
			});
		}
	};

	return (
		<Container className="mt-6 mx-3">
			<Title
				text="Оформление заказа"
				size="lg"
				className="font-extrabold mb-8"
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						{/* Левая часть */}
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart />
							<CheckoutPersonalForm
								className={
									loading
										? "opacity-40 pointer-events-none"
										: ""
								}
							/>
							<CheckoutAddressForm
								className={
									loading
										? "opacity-40 pointer-events-none"
										: ""
								}
							/>
						</div>

						{/* Правая часть */}
						<div className="w-[450px]">
							<CheckoutSidebar
								loading={loading || submitting}
								totalAmount={totalAmount}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
