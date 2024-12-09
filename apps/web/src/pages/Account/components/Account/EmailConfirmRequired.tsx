import { SentEmail } from '@/pages/Form/components/SignUp/index.js';
import { FormContainer } from '@/shared/ui/FormUi/FormContainer.js';

export const EmailConfirmRequired = () => (
	<div className="flex flex-col gap-4 md:gap-9 items-center w-full md:w-[35rem]">
      <FormContainer>
        <SentEmail />
      </FormContainer>
    </div>
);