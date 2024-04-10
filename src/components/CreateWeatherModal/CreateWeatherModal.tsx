import cnBind from 'classnames/bind';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { UIDropdown } from '@/components/UI/UIDropdown';
import { UIInputNumber } from '@/components/UI/UIInputNumber';
import { UIInputTextarea } from '@/components/UI/UIInputTextarea';
import { SYMBOLS_OF_TEMPERATURE_UNIT } from '@/constants';
import { useToastContext } from '@/context';
import { useCreateWeatherNoteMutation, useUpdateWeatherNoteMutation } from '@/store';
import { toastMessageCreator } from '@/utils';

import {
  NOTE_CREATE_SUCCESS,
  NOTE_UPDATED_SUCCESS,
  NOTE_CREATE_ERROR,
  NOTE_UPDATED_ERROR,
} from './CreateWeatherModal.constatnts';
import styles from './CreateWeatherModal.module.scss';
import { validateCreateWeatherNodeForm } from './CreateWeatherModal.utils';

import type { CreateWeatherModalProps, FormikFormData } from './CreateWeatherModal.types';
import type { FormikHelpers } from 'formik';

const cx = cnBind.bind(styles);

export const CreateWeatherModal: React.FC<CreateWeatherModalProps> = ({
  formData,
  userOptions = [],
  weatherTypeOptions = [],
  ...props
}) => {
  const [postProduct] = useCreateWeatherNoteMutation();
  const [updateProduct] = useUpdateWeatherNoteMutation();

  const showMessage = useToastContext();

  const handleFormSubmit = async (
    value: Partial<FormikFormData>, formikHelpers: FormikHelpers<Partial<FormikFormData>>,
  ) => {
    try {
      if (value.id) {
        await updateProduct({ ...value, user: value.user?.id, weatherType: value.weatherType?.id }).unwrap();
      } else {
        await postProduct({ ...value, user: value.user?.id, weatherType: value.weatherType?.id }).unwrap();
      }
      showMessage?.(toastMessageCreator.success(value.id ? NOTE_UPDATED_SUCCESS : NOTE_CREATE_SUCCESS));
      formikHelpers.resetForm({});
      props.onHide();
    } catch (error) {
      showMessage?.(toastMessageCreator.error(value.id ? NOTE_UPDATED_ERROR : NOTE_CREATE_ERROR));
    }
  };

  const formic = useFormik<Partial<FormikFormData>>({
    initialValues: { ...formData, temperature: formData.temperature?.value },
    enableReinitialize: true,
    onSubmit: handleFormSubmit,
    validate: validateCreateWeatherNodeForm,
  });

  return (
    <Dialog
      {...props}
      className={cx('create-weather-modal')}
      header={formData.id ? 'Редактировать запись' : 'Создать запись'}
    >
      <form className={cx('form')} onSubmit={formic.handleSubmit}>
        <UIDropdown
          options={userOptions}
          placeholder="Выберете пользователя"
          label="Кто заполнял"
          value={formic.values.user}
          name="user"
          error={formic.errors.user}
          onChange={formic.handleChange}
        />
        <UIDropdown
          options={weatherTypeOptions}
          placeholder="Выберете тип погоды"
          label="Погода"
          name="weatherType"
          optionLabel="name"
          error={formic.errors.weatherType}
          value={formic.values.weatherType}
          onChange={formic.handleChange}
        />
        <UIInputNumber
          label={`Температура ${SYMBOLS_OF_TEMPERATURE_UNIT[formData.temperature?.unitOfMeasure || 'celsius']}`}
          step={0.01}
          name="temperature"
          value={formic.values.temperature}
          error={formic.errors.temperature}
          minFractionDigits={0}
          maxFractionDigits={2}
          useGrouping={false}
          onChange={(e) => formic.handleChange(e.originalEvent)}
        />
        <UIInputTextarea
          name="comment"
          label="Комментарий"
          value={formic.values.comment}
          onChange={formic.handleChange}
        />
        <Button type="submit">Сохранить</Button>
      </form>
    </Dialog>
  );
};
