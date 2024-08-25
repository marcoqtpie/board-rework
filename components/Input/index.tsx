import useImages from '@/hooks/useImages';
import classNames from 'classnames';
import Image from 'next/image';
import type { ChangeEvent, ClipboardEvent, ComponentPropsWithoutRef } from 'react';
import { forwardRef, useState } from 'react';
import styles from './index.module.scss';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  errorClassName?: string;
  disablePasted?: boolean;
  passwordToggle?: boolean;
  defaultValidate?: boolean;
  onRequestVerification?: () => void;
  number?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    value,
    error,
    className,
    containerClassName,
    errorClassName,
    disablePasted = false,
    passwordToggle = false,
    // codeVerification = false,
    type = 'text',
    number = false,
    defaultValidate = true,
    onRequestVerification,
    ...rest
  },
  ref,
) {
  const [inputValue, setInputValue] = useState<string>('');
  const { images } = useImages();
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const toggleImage = passwordType === 'password' ? images.hidePassword : images.showPassword;

  const handleShowPassword = () => setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));

  const handlePasted = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disablePasted) e.preventDefault();
  };

  const onFocus = (e: ChangeEvent<HTMLInputElement>) => e.target.removeAttribute('readonly');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (number) {
      const sanitizedValue = newValue.replace(/\D/g, '');
      setInputValue(sanitizedValue);
    } else {
      setInputValue(newValue);
    }
    if (rest.onChange) rest.onChange(e);
  };

  return (
    <div className={classNames(styles.container, containerClassName)}>
      <input
        id={label}
        name={label}
        type={type === 'password' ? passwordType : type}
        className={classNames(styles.input__field, className, {
          [styles['input__field--error']]: defaultValidate && error,
        })}
        onPaste={handlePasted}
        onFocus={onFocus}
        readOnly
        ref={ref}
        {...rest}
        onChange={handleChange}
        value={inputValue}
      />
      {passwordToggle && (
        <Image
          src={toggleImage}
          width={22}
          height={19}
          alt='show'
          className={styles.input__toggleMask}
          onClick={handleShowPassword}
        />
      )}
      {onRequestVerification && (
        <button type='button' className={styles.input__codeVerification} onClick={onRequestVerification}>
          获取验证码
        </button>
      )}
    </div>
  );
});

export default Input;
