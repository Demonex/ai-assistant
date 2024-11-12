import capitalize from 'lodash.capitalize';

interface FormInputErrorProps {
	message: string;
}

export const FormInputError = (props: FormInputErrorProps) => {
	const { message } = props;

	return (
		<p
            className="text-secondary_red text-caption_m_desk mt-1.5">
				{capitalize(String(message))}
		</p>
	);
}