import { Tab } from '@headlessui/react';
import { accountTabs } from '../../consts.js';
import { useState } from 'react';
import { AccountSettings } from './AccountSettings/ui/AccountSettings.js';
import PaymentInfo from './PaymentInfo.js';
import { Subscriptions } from './Subscriptions.js';
import Team from './Team.js';
import ManageNotifications from './ManageNotifications.js';

export const AccountTabs = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);


	return (
		<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
           <Tab.List
             className="flex gap-10 border-b border-secondary_dark_gray/50 overflow-x-auto overflow-y-hidden mt-1">
             {
               accountTabs.filter((_, index) => index < 5).map((tab, index) => (
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
               <AccountSettings />
             </Tab.Panel>
             <Tab.Panel className="w-full">
               <PaymentInfo/>
             </Tab.Panel>
             <Tab.Panel className="w-full">
               <Subscriptions/>
             </Tab.Panel>
             <Tab.Panel className="w-full">
               <Team/>
             </Tab.Panel>
             <Tab.Panel className="w-full">
               <ManageNotifications/>
             </Tab.Panel>
           </Tab.Panels>
         </Tab.Group>
	);
}