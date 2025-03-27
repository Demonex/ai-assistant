import { SignIn } from "@repo/web/pages/Auth/components/SignIn.js";

export default function SignInPage() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignIn />
			</div>
		</div>
	);
}
