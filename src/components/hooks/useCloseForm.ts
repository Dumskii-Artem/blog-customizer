// src\components\hooks\useCloseForm.ts

import { useEffect } from 'react';

type Props = {
	isOpen: boolean;
	refForm: React.RefObject<HTMLElement>;
	onClose: () => void;
};

export const useCloseForm = ({ isOpen, refForm, onClose }: Props) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (refForm.current && !refForm.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, refForm]);
};
