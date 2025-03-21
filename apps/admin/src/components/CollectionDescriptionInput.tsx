"use client";

import { FieldLabel, TextInput, useField } from "@payloadcms/ui";
import type React from "react";
import { type ChangeEvent, useEffect, useRef } from "react";

const CollectionDescriptionInput: React.FC<{
	path: string;
	field: { label: string };
	required?: boolean;
}> = ({ path, field: { label }, required }) => {
	const { value, setValue } = useField<string>({ path });
	const { value: title } = useField<string>({ path: "title" });
	const { value: description } = useField<string>({ path: "description" });

	const isUserEdited = useRef(false);

	const generateDescription = () => {
		return `Здравствуйте! Это чат с документами${title ? `"${title}"` : "{title}"}. Вы можете задать вопросы по этим документам, и система постарается найти на них ответы.`;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		isUserEdited.current = true;
		setValue(e.target.value);
	};

	useEffect(() => {
		if (!value && description !== generateDescription()) {
			setValue(generateDescription());
		}
	}, [setValue, description]);

	useEffect(() => {
		const newDescription = generateDescription();

		if (!isUserEdited.current && newDescription !== value) {
			setValue(newDescription);
		}
	}, [title, setValue, value]);

	return (
		<div className="mb-[var(--spacing-field)]">
			<FieldLabel htmlFor={path} label={label} required={required} />
			<TextInput path={path} value={value} onChange={handleChange} />
		</div>
	);
};

export default CollectionDescriptionInput;
