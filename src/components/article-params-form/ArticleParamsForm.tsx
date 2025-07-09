// src\components\article-params-form\ArticleParamsForm.tsx

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { useState } from 'react';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	applySettings,
}: ArticleParamsFormProps) => {
	const [formIsOpened, setFormIsOpened] = useState(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const { fontFamilyOption } = formSettings;

	const toggleForm = () => {
		setFormIsOpened((opened) => !opened);
	};

	const updateFormSettings = (newSettings: Partial<ArticleStateType>) => {
		setFormSettings((prev) => ({ ...prev, ...newSettings }));
	};

	const handleFontChange = (newValue: OptionType) =>
		updateFormSettings({ fontFamilyOption: newValue });

	const defaultFontFamilyPlaceholder =
		fontFamilyOption?.title || fontFamilyOptions[0]?.title;

	const resetFormSettings = () => {
		setFormSettings(defaultArticleState);
		applySettings(defaultArticleState);
		toggleForm();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		applySettings(formSettings);
		toggleForm();
	};

	return (
		<>
			<ArrowButton isOpen={formIsOpened} onClick={toggleForm} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpened,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={defaultFontFamilyPlaceholder}
						onChange={handleFontChange}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetFormSettings}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
