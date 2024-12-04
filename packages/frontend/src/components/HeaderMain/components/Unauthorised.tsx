import {useSizes} from '../../../hooks/useSizes.js';
import {memo, useCallback} from 'react';
import {Link} from 'wouter';
import {useAccount} from '../../Header/hooks/useAccount.js';
import {useMobileMenu} from '../../Header/components/MobileMenu/hooks/useMobileMenu.js';
import SearchIcon from '../../../assets/SearchIcon.js';
import Burger from '../../../assets/BurgerNew.js';
import {useOpenModalSearch} from '../../../hooks/useOpenModalSearch.js';
import IconUserAccount from '../../../assets/IconUserAccount.js';

export const Unauthorised = memo(() => {
	const {setSubscription,setIsOpenSearchModal, setButtonText, setSubscriptionOnClick, setIsShowAll} = useOpenModalSearch();
	const {setIsOpen: setIsOpenMobileMenu} = useMobileMenu();
	const {profile} = useAccount();
	const {elementRange: elementRangeMobile} = useSizes(320, 1023);
	const burgerSize = elementRangeMobile(27, 44);
	const {isTablet, isMobile} = useSizes();
	
	const handleSearchClick = useCallback(() => {
		setSubscription(undefined);
		setButtonText('Перейти');
		setSubscriptionOnClick(false);
		setIsShowAll(true);
		setIsOpenSearchModal(true);
	}, []);
	
	return (
		<>
			{
				isTablet || isMobile
					? <div className="flex gap-5 ">
						<button onClick={handleSearchClick}>
							<SearchIcon color="white" width={40}/>
						</button>
						<Link to={profile ? '/account' : '/auth/sign-in'}>
							<IconUserAccount className="fill-white h-10 w-10"/>
						</Link>
						<button onClick={() => setIsOpenMobileMenu(true)}>
							<Burger height={`${burgerSize}px`}/>
						</button>
					</div>
					: <div className="flex gap-6">
						<div
							className="flex items-center justify-center cursor-pointer"
							onClick={handleSearchClick}>
							<SearchIcon width="1.375rem" className="fill-amber-50 hover:fill-medium_grey"/>
						</div>
						<Link to={profile ? '/account' : '/auth/sign-in'}>
							<IconUserAccount className="fill-amber-50 hover:fill-medium_grey cursor-pointer"/>
						</Link>
					</div>
			}
		</>

	);
}
);