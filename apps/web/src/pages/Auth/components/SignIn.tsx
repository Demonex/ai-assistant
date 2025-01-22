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

	const { handleSignIn } = useProfile();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await handleSignIn(data);
		navigate("/");
	};

	const [, navigate] = useLocation();

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your username and password below to log into your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Login</Label>
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
									<Label htmlFor="password">Password</Label>
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
								Login
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
