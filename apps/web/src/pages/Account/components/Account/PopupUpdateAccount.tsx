import { Button } from '@/shared/ui/Button/Button.js';
import { Modal } from '@/shared/ui/Modal/index.js';
import { ModalActions } from '@/shared/ui/Modal/ui/ModalActions.js';
import { ModalTitle } from '@/shared/ui/Modal/ui/ModalTitle.js';

interface PopupUpdateAccountProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const PopupUpdateAccount = (props: PopupUpdateAccountProps) => {
  const { open, onClose, onConfirm } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalTitle>Сохранить изменения?</ModalTitle>
      <ModalActions>
        <Button variant='secondary' type='button' onClick={onClose}>
          Отмена
        </Button>
        <Button onClick={onConfirm}>
          Сохранить
        </Button>
       </ModalActions>
    </Modal>
  );
};
