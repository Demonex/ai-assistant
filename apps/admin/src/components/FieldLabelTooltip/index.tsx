"use client";

import type { GenericLabelProps } from "payload";

import type React from "react";
import { useState } from "react";
import {
	useForm,
	useEditDepth,
	useTranslation,
	useLocale,
	Tooltip,
} from "@payloadcms/ui";
import { generateFieldID } from "@payloadcms/ui/utilities/generateFieldID";
import { getTranslation } from "@payloadcms/translations";

import "./index.scss";

const tooltips = {
	"tenant.superadmins": "Can manage everything",
	"tenant.admins": "Can manage everything except SuperAdmins",
	"tenant.collections": "Can manage collections",
	"tenant.models": "Can manage models",
};

export const FieldLabelTooltip: (
	props: GenericLabelProps,
) => React.JSX.Element | null = (props) => {
	const {
		as: Element = "label",
		hideLocale = false,
		htmlFor: htmlForFromProps,
		label: labelLocal,
		localized = false,
		path,
		required = false,
		unstyled = false,
		schemaPath = "",
	} = props;

	const label = labelLocal || (props as any).field?.label;

	const { uuid } = useForm();
	const editDepth = useEditDepth();
	const htmlFor = htmlForFromProps || generateFieldID(path, editDepth, uuid);
	const { i18n } = useTranslation();
	const { code, label: localLabel } = useLocale();
	const [showTooltip, setShowTooltip] = useState(false);
	const baseClass = "field-label";

	// console.log("props", props);

	if (label) {
		return (
			<Element
				className={`field-label ${unstyled ? "unstyled" : ""}`}
				htmlFor={htmlFor}
			>
				{getTranslation(label, i18n)}
				{required && !unstyled && <span className="required">*</span>}
				{localized && !hideLocale && (
					<span className="localized">
						&mdash; {typeof localLabel === "string" ? localLabel : code}
					</span>
				)}
				{Object.keys(tooltips).includes(schemaPath) && (
					<button
						aria-label={"tooltip info"}
						className={`${baseClass}__drawer-toggler`}
						onClick={() => {
							setShowTooltip(false);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.stopPropagation();
							}
						}}
						onMouseDown={(e) => e.stopPropagation()} // prevents react-select dropdown from opening
						onMouseEnter={() => setShowTooltip(true)}
						onMouseLeave={() => setShowTooltip(false)}
						onTouchEnd={(e) => e.stopPropagation()} // prevents react-select dropdown from openingtype="button"
						type="button"
					>
						<Tooltip
							className={`${baseClass}__tooltip`}
							show={showTooltip}
							alignCaret="left"
						>
							{tooltips[schemaPath]}
						</Tooltip>
						?
					</button>
				)}
			</Element>
		);
	}

	return null;
};
FieldLabelTooltip.displayName = "FieldLabelTooltip";
export default FieldLabelTooltip;
