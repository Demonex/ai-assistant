import { useParams } from "wouter";
import Labels from "./components/Labels/index.js";
import Managers from "./components/Managers/index.js";
import Distributors from "./components/Distributors/index.js";
import Fans from "./components/Fans/index.js";

export const CustomerPage = () => {
	const params = useParams();
	const customerName = params["customer-name"];
	const heroSection = () => {
		switch (customerName) {
			case "labels":
				return <Labels />;
			case "managers":
				return <Managers />;
			case "distributors":
				return <Distributors />;
			case "fans":
				return <Fans />;
		}
	};
	return <>{heroSection()}</>;
};
