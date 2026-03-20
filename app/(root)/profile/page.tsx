import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/shared/components";
import { getUserSession } from "@/shared/utils/get-user-session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const session = await getUserSession();

	if (!session) {
		return redirect("/not-auth");
	}

	const user = await prisma.user.findFirst({
		where: { id: Number(session?.id) },
	});

	if (!user) {
		return redirect("/not-auth");
	}

	return (
		<div className="mx-3">
			<ProfileForm data={user} />
		</div>
	);
}
