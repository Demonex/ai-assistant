/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import type { Metadata } from "next";

import { WebWrapper } from "@/components/RootChange";

import { importMap } from "../importMap";

type Args = {
	params: Promise<{
		segments: string[];
	}>;
	searchParams: Promise<{
		[key: string]: string | string[];
	}>;
};

export const generateMetadata = ({
	params,
	searchParams,
}: Args): Promise<Metadata> =>
	generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) => {
	const PageComponent = RootPage({ config, params, searchParams, importMap });
	return <WebWrapper>{PageComponent}</WebWrapper>;
};

export default Page;
