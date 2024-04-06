import {ChangeEvent} from 'react';
import './Input.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface InputProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    prefix?: string;
    suffix?: string;
    type?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
    onChange?: (data: string) => void;
}

export default function Input(props: InputProps) {
    const {
        value, defaultValue, prefix, suffix, type, placeholder,
        minLength, maxLength, disabled, onChange, ...containerProps
    } = props;

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);
    }

    return (
        <UIContainer {...containerProps}>
            <div className={'da-input-content'}>
                {prefix && <div className={'da-input-prefix'}>{prefix}&nbsp;</div>}
                <div className={'da-input-body'}>
                    <input value={value}
                           defaultValue={defaultValue}
                           minLength={minLength}
                           maxLength={maxLength}
                           disabled={disabled}
                           placeholder={placeholder}
                           type={type}
                           className={'da-input'}
                           onChange={_onChange}/>
                </div>
                {suffix && <div className={'da-input-suffix'}>&nbsp;{suffix}</div>}
            </div>
        </UIContainer>
    );
}