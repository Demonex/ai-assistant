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

type Inputs = {
	email: string;
	password: string;
};

export function SignIn({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<Inputs>();
	const { handleSignIn, errorSignIn, isAuthorized } = useProfile();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		handleSignIn(data);
	};

	useEffect(() => {
		if (isAuthorized) navigate("/");
	}, [isAuthorized, navigate]);

	useEffect(() => {
		if (!errorSignIn) return;

		if (errorSignIn.status === 500) {
			toast({
				variant: "destructive",
				title: errorSignIn.status.toString(),
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

	if (loading || loadingChats) {
		return (
			<div className="fixed top-[50%] left-[50%]">
				<Spinner />
			</div>
		);
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Вход</CardTitle>
					<CardDescription>
						Введите ниже свое имя пользователя и пароль, чтобы войти в свою
						учетную запись.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Почта</Label>
								<Input
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
									id="password"
									type="password"
									{...register("password", {
										required: true,
									})}
								/>
							</div>
							<Button type="submit" className="w-full">
								Войти
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
