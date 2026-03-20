import React from "react";

interface Props {
	orderId: number;
}

export const OrderErrorTemplate: React.FC<Props> = ({ orderId }) => (
	<div>
		<h1>Не удалось оформить заказ ❌</h1>

		<p>
			Ваш заказ #{orderId} не оплачен. Вернитесь на сайт и попробуйте
			снова.
		</p>
	</div>
);
