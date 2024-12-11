import { memo } from "react";
import { NavigationItems } from "../Sidebar/Sidebar.js";

const MobileTabs = memo(() => {
	return (
		<div className="w-full fixed bottom-0 z-50 bg-popup_gray py-4">
			<div className="flex justify-around">
				<NavigationItems />
			</div>
		</div>
	);
});
export default MobileTabs;
