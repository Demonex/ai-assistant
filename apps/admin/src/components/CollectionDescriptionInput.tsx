"use client";

import { FieldLabel, TextInput, useField } from "@payloadcms/ui";
import type React from "react";
import { useEffect } from "react";

const CollectionDescriptionInput: React.FC<{
	path: string;
	field: { label: string };
	required?: boolean;
}> = ({ path, field: { label }, required, ...rest }) => {
	const { value, setValue } = useField<string>({ path });
	const { value: title } = useField<string>({ path: "title" });

	useEffect(() => {
		if (!value) {
			setValue(
				`Здравствуйте! Это чат с документами${title ? ` "${title}"` : ""}. Вы можете задать вопросы по этим документам, и система постарается найти на них ответы`,
			);
		}
	}, [setValue]);

	useEffect(() => {
		setValue(
			`Здравствуйте! Это чат с документами${title ? ` "${title}"` : ""}. Вы можете задать вопросы по этим документам, и система постарается найти на них ответы`,
		);
	}, [title]);

	return (
		<div className="mb-[var(--spacing-field)]">
			<FieldLabel htmlFor={path} label={label} required={required} />
			<TextInput path={path} value={value} onChange={setValue} />
		</div>
	);
};

export default CollectionDescriptionInput;
