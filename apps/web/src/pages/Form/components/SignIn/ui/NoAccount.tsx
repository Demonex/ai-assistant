import { Link } from "wouter";

export const NoAccount = () => {
	return (
		<div className="mt-4 text-center">
			<p className="text-caption_r_desk text-medium_grey">
				Нет аккаунта?{" "}
				<Link
					className="text-[white] hover:text-medium_grey"
					to="/auth/sign-up"
				>
					Создать
				</Link>
			</p>
		</div>
	);
};
