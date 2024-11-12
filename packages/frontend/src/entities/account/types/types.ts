export type Language = 'en';
export type Currency = 'usd';

export interface IProfile {
	email: string;
	emailVerified: boolean;
	language: Language;
	currency: Currency;
	concent: boolean;
}