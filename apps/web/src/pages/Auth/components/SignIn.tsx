import { useEffect } from "react";
import { cn } from "@/lib/utils.js";
import { Button } from "@/components/ui/button.js";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.js";
import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useProfile } from "@/hooks/useProfile.js";
import { useLocation } from "wouter";
import { toast } from "@/hooks/use-toast.js";

type Inputs = {
	email: string;
	password: string;
};
export function SignIn({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const [, navigate] = useLocation();
	const { handleSignIn, errorSignIn } = useProfile();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await handleSignIn(data);
		navigate("/");
	};

	useEffect(() => {
		if (errorSignIn) {
			toast({
				variant: "destructive",
				title: errorSignIn.status,
				description: errorSignIn.message,
			});
		}
	}, [errorSignIn]);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Логин</CardTitle>
					<CardDescription>
						Введите ниже свое имя пользователя и пароль, чтобы войти в свою
						учетную запись.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Вход</Label>
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
