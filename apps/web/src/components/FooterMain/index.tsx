const icons = [
	{
		name: "vk",
		icon: <VkSmm className="hover:fill-primary_blue" />,
		link: "https://vk.com/",
	},
	{
		name: "zen",
		icon: <ZenSmm className="hover:fill-primary_blue" />,
		link: "https://dzen.ru/",
	},
	{
		name: "tg",
		icon: <TGSmm className="hover:fill-primary_blue" />,
		link: "https://t.me/media",
	},
	{
		name: "yt",
		icon: <YoutubeSmm className="hover:fill-primary_blue" />,
		link: "https://www.youtube.com/channel/",
	},
	{
		name: "rt",
		icon: <RutubeSmm className="hover:fill-primary_blue" />,
		link: "https://rutube.ru/channel//",
	},
];

const Footer = memo(() => {
	const { isTablet, isMobile } = useSizes();
	const { elementRange: elementRangeLaptop } = useSizes(1024, 1920);
	const { paddingHorizontal } = useElementRangeSize();
	const appBtnWidth = elementRangeLaptop(10.25, 12.25);
	const scrollToTop = () => {
		document.getElementById("app").scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const apps = [
		{
			name: "apple",
			img: (
				<AppleBtn
					style={{
						width: isMobile || isTablet ? "12.25rem" : `${appBtnWidth}rem`,
					}}
					className="group-hover:fill-primary_blue max-h-[58px]"
				/>
			),
		},
		{
			name: "rustore",
			img: (
				<RustoreBtn
					style={{
						width: isMobile || isTablet ? "12.25rem" : `${appBtnWidth}rem`,
					}}
					className="group-hover:fill-primary_blue max-h-[58px]"
				/>
			),
		},
		{
			name: "google",
			img: (
				<GoogleBtn
					style={{
						width: isMobile || isTablet ? "12.25rem" : `${appBtnWidth}rem`,
					}}
					className="group-hover:fill-primary_blue max-h-[58px]"
				/>
			),
		},
	];
	const [, navigate] = useLocation();

	return (
		<footer
			className="w-full bg-[#060708] flex flex-col relative py-8 md:pb-[3.125rem] lg:pt-[5rem] lg:pb-10  lg:gap-2.5"
			style={{
				paddingRight: `${paddingHorizontal}px`,
				paddingLeft: `${paddingHorizontal}px`,
			}}
		>
			<div className="min-w-full flex flex-col md:flex-row  pb-8 justify-between md:gap-[3.25rem] lg:gap-[2.25rem]">
				<div className="flex flex-col md:gap-11 lg:gap-6 pb-5 md:pb-[unset] border-b border-dark_grey md:border-none">
					<div className="flex flex-row justify-between md:justify-start md:flex-col md:gap-6 lg:gap-2">
						Logo
					</div>
					{isMobile ? null : (
						<div className="flex flex-col gap-0.5">
							<Link
								to="/documents/privacy-policy"
								className="text-caption_m_desk text-light_grey hover:text-medium_grey cursor-pointer"
								onClick={scrollToTop}
							>
								Политика конфеденциальности
							</Link>
							<Link
								to="/documents/user-agreement"
								className="text-caption_m_desk text-light_grey hover:text-medium_grey cursor-pointer"
								onClick={scrollToTop}
							>
								Пользовательское соглашение
							</Link>
							<Link
								to="/documents/public-offer"
								className="text-caption_m_desk text-light_grey  hover:text-medium_grey"
								onClick={scrollToTop}
							>
								Публичная оферта
							</Link>
						</div>
					)}
				</div>
				{!isMobile ? null : (
					<div className="flex justify-between py-5 md:py-[unset] border-b border-dark_grey md:border-[unset]">
						{icons.map((icon, i) => (
							<a
								className="w-10 h-10"
								key={i}
								href={icon.link}
								target="_blank"
								rel="noreferrer"
							>
								{icon.icon}
							</a>
						))}
					</div>
				)}
				<div className="flex flex-col gap-5 py-5 md:py-[unset] border-b border-dark_grey md:border-none">
					{isMobile ? null : (
						<div className="flex gap-3">
							{icons.map((icon, i) => (
								<a
									className=" w-10 h-10 cursor-pointer "
									key={i}
									href={icon.link}
									target="_blank"
									rel="noreferrer"
								>
									{icon.icon}
								</a>
							))}
						</div>
					)}
					<div className="flex flex-col gap-5"></div>
				</div>
				<div className="flex flex-col gap-4 md:gap-3 mt-5 md:mt-[unset] ">
					{apps.map((app, i) => (
						<div key={i} className="group cursor-pointer ">
							{app.img}
						</div>
					))}
				</div>
				{!isMobile ? null : (
					<div className="flex flex-col gap-1 mt-6">
						<Link
							to="/documents/privacy-policy"
							className="text-caption_m_desk text-light_grey  hover:text-primary_blue"
							onClick={scrollToTop}
						>
							Политика конфеденциальности
						</Link>
						<Link
							to="/documents/user-agreement"
							className="text-caption_m_desk text-light_grey  hover:text-medium_grey"
							onClick={scrollToTop}
						>
							Пользовательское соглашение
						</Link>
						<Link
							to="/documents/public-offer"
							className="text-caption_m_desk text-light_grey  hover:text-medium_grey"
							onClick={scrollToTop}
						>
							Публичная оферта
						</Link>
					</div>
				)}
			</div>
		</footer>
	);
});
export default Footer;
