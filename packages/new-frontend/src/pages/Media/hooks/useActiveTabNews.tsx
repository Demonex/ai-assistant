import {useState} from "react";
import useSharedHook from "../../../hooks/useSharedHook.js";
type Props = {
    activeTab: number;
    setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
const _useActiveTabNews = ():Props => {
    const [activeTab, setActiveTab] = useState(0);

    return {
        activeTab,
        setActiveTab
    }
}
export const useActiveTabNews = () => useSharedHook<ReturnType<typeof _useActiveTabNews>>(_useActiveTabNews);