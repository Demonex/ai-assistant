import {memo, useState} from "react";
import SecondaryButton from "../../../components/SecondaryButton.js";
import {SignOutIcon} from "../../../assets/SignOutIcon.js";
import {Tab} from "@headlessui/react";
import {accountTabs} from "../consts.js";
import {useAccountSettings} from "./hooks/useAccountSettings.js";
import ActivityFeed from "./Settings/ActivityFeed.js";
import Integrations from "./Settings/Integrations.js";
import {FavoriteSources} from "./Settings/FavoriteSources.js";
import Notifications from "./Settings/Notifications.js";

const SettingsPage = memo(() => {
  const {onSubmitSignOut} = useAccountSettings();
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="w-full h-full px-6 overflow-auto">
      <div className="w-full py-4  flex justify-between ">
        <h1 className="text-t1Semi_deck font-extrabold tracking-tight text-slate-200">Настройки</h1>
        <SecondaryButton title="Выйти" className="flex flex-row-reverse gap-2"
                         onClick={onSubmitSignOut}
        >
          <SignOutIcon className="fill-light_grey"/>
        </SecondaryButton>
      </div>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
        <Tab.List
          className="flex gap-10 border-b border-secondary_dark_gray/50 overflow-x-auto overflow-y-hidden mt-1">
          {
            accountTabs.filter((_, index) => index >= 5).map((tab, index) => (
              <div
                className={`capitalize flex text-t2Regular px-4 py-2 border-solid border-b whitespace-nowrap ${selectedIndex === index ? 'text-medium_grey border-medium_grey' : 'border-transparent '}`}
                key={index}>
                <Tab
                >{tab.title}
                </Tab>
              </div>
            ))
          }
        </Tab.List>
        <Tab.Panels className="w-full flex justify-center">
          <Tab.Panel className="w-full">
            <ActivityFeed/>
          </Tab.Panel>
          <Tab.Panel className="w-full">
            <Integrations/>
          </Tab.Panel>
          <Tab.Panel className="w-full">
            <FavoriteSources/>
          </Tab.Panel>
          <Tab.Panel className="w-full">
            <Notifications/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
})
export default SettingsPage