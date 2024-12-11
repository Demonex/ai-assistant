import { useSizes } from "../../../hooks/useSizes.js";
import { Disclosure } from "@headlessui/react";
import { memo } from "react";
import tape from "/assets/png/Tape@3x.png";
import { useElementRangeSize } from "../../../hooks/useElementRangeSize.js";
import { ShowOnLaptopToDesktop } from "../../../components/SowOnLaptopToDeckTop/index.js";

const questions = [
	{
		title: "Что такое Rifify и зачем он нужен?",
		description:
			"Rifify — это аналитический сервис, разработанный специально для музыкантов, музыкальных лейблов и их команд. Он помогает собирать и анализировать данные о прослушиваниях, популярности треков, взаимодействии с фанатами",
	},
	{
		title: "Какие ключевые функции сервиса?",
		description: (
			<p>
				Rifify отслеживает данные с популярных платформ
				<br />
				ООповещения в реальном времени
				<br />
				ИПростота интерфейса и легкость в использовании
				<br />
				Сервис позволяет отслеживать в какие популярные плейлисты попадает
				музыка
				<br />
			</p>
		),
	},
	{
		title: "Какие данные использует сервис?",
		description:
			"Rifify использует комплексные данные из различных источников: информация о количестве прослушиваний на известных платформах, данные о местоположении слушателей, информация о вовлеченности в социальных сетях и плейлистах",
	},
	{
		title: "Какие тарифы у сервиса ?",
		description: (
			<p>
				Сервис предлагает тарифный план и скидки в зависимости от количества
				подписок, включая бесплатный демо - доступ. Информацию о тарифах можно
				найти{" "}
				<a
					href="http://rifify.me/#tariffes"
					target="_blank"
					className="underline"
					rel="noreferrer"
				>
					здесь
				</a>
			</p>
		),
	},
	{
		title: "Кому еще будет интересен сервис кроме музыкантов ?",
		description:
			"Фанаты могут использовать Rifify для более глубокого знакомства с артистами и их музыкой и следить за популярностью любимых треков и альбомов на популярных платформах",
	},
	{
		title: "Как мне связаться со службой поддержки Rifify?",
		description:
			"Вы можете связаться с нашей службой поддержки по электронной почте support@rifify.me",
	},
	{
		title: "Что входит в бесплатный демо - доступ?",
		description:
			"В бесплатный демо-доступ Rifify входит ограниченный доступ к аналитике и каталогу",
	},
];
const FAQ = memo(() => {
	const { isTablet, isMobile } = useSizes();
	const { elementRange: elementRangeLaptop } = useSizes(1024, 2560);
	const { elementRange: elementRangeMobile } = useSizes(320, 1024);
	const { h1Size, h1SizeMobile, marginVertical, paddingHorizontal } =
		useElementRangeSize();
	const gapBetweenQuestions = elementRangeLaptop(25, 48);
	const gapBetweenQuestionsMobile = elementRangeMobile(13, 25);
	const questionsHorizontalPadding = elementRangeLaptop(0, 162);
	const tapeSize = elementRangeLaptop(110, 200);

	return (
		<div
			style={{
				marginTop: `${marginVertical}px`,
				marginBottom: `${marginVertical}px`,
				paddingRight: `${paddingHorizontal}px`,
				paddingLeft: `${paddingHorizontal}px`,
			}}
			className="w-full flex flex-col gap-10"
		>
			<h1
				style={{
					fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
					paddingLeft: `${questionsHorizontalPadding}px`,
					paddingRight: `${questionsHorizontalPadding}px`,
				}}
				className="text-h2Desctop font-bold lg:font-black text-left w-full"
			>
				Вопросы и ответы
			</h1>
			<div
				style={{
					paddingLeft: `${questionsHorizontalPadding}px`,
					paddingRight: `${questionsHorizontalPadding}px`,
					gap:
						isMobile || isTablet
							? `${gapBetweenQuestionsMobile}px`
							: `${gapBetweenQuestions}px`,
				}}
				className="w-full flex flex-col "
			>
				{questions.map((item, index) => (
					<Disclosure key={index}>
						{({ open }) => (
							<Disclosure.Button
								className={`group w-full gap-4 md:gap-8 bg-dark_grey  flex flex-col items-center justify-start py-4 md:py-10 px-5 md:px-12 lg:px-[3.75rem] rounded-[12px] md:rounded-[20px] ${index === 0 ? "relative" : ""}`}
							>
								<ShowOnLaptopToDesktop>
									{index === 0 && (
										<img
											src={tape}
											className="absolute right-[100px] -top-[25px]"
											style={{ width: `${tapeSize}px` }}
										/>
									)}
								</ShowOnLaptopToDesktop>
								<div className="w-full flex  items-center justify-between lg:gap-6 relative">
									<p className="text-h3Mobile md:text-h3Desctop w-full text-left">
										{item.title}
									</p>
									<div
										className={`plusminus_animation w-8 h-8 md:w-[60px] md:h-[60px] ${open ? "active" : ""}`}
									/>
								</div>
								<Disclosure.Panel className="w-full">
									<p className="text-[white] text-left text-t1Mobile md:text-t1Regular">
										{item.description}
									</p>
								</Disclosure.Panel>
							</Disclosure.Button>
						)}
					</Disclosure>
				))}
			</div>
		</div>
	);
});
export default FAQ;
