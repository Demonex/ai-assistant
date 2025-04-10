import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Spinner } from "@repo/web/components/Spinner.js";
import { Button } from "@repo/web/components/ui/button.js";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/web/components/ui/card.js";
import { Input } from "@repo/web/components/ui/input.js";
import { Label } from "@repo/web/components/ui/label.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import { useProfile } from "@repo/web/hooks/useProfile.js";
import { cn } from "@repo/web/lib/utils.js";

import { SignInData } from "@/types/types.js";

export function SignIn({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<SignInData>();
	const { handleSignIn, errorSignIn, isAuthorized, pendingSignIn } =
		useProfile();

	const onSubmit: SubmitHandler<SignInData> = async (data) => {
		handleSignIn(data);
	};

	useEffect(() => {
		if (isAuthorized) navigate("/");
	}, [isAuthorized, navigate]);

	useEffect(() => {
		if (!errorSignIn) return;

		if (errorSignIn.statusCode === 500) {
			toast({
				variant: "destructive",
				title: errorSignIn.statusCode.toString(),
				description: errorSignIn.message,
			});
		} else {
			toast({
				variant: "destructive",
				title: "Не удалось войти",
				description:
					"Проверьте правильность введённых данных или зарегистрируйтесь.",
			});
		}
	}, [errorSignIn]);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Вход</CardTitle>
					<CardDescription>
						Введите почту и пароль, чтобы войти в свою учетную запись.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Почта</Label>
								<Input
									disabled={pendingSignIn}
									id="email"
									type="email"
									{...register("email", {
										required: true,
									})}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Пароль</Label>
								</div>
								<Input
									disabled={pendingSignIn}
									id="password"
									type="password"
									{...register("password", {
										required: true,
									})}
								/>
							</div>
							<Button type="submit" className="w-full" disabled={pendingSignIn}>
								{pendingSignIn ? <Spinner className="text-white" /> : "Войти"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
