export type Language = 'en';
export type Currency = 'usd';

export interface IProfile {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	language: Language;
	currency: Currency;
	concent: boolean;
}