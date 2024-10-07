import { useEffect, useRef } from 'react';

const SimpleTextEditor = (props: any) => {
    const updateValue = (val: any) => {
        props.onValueChange(val === '' ? null : val);
    };

    useEffect(() => {
        let startValue;

        if (props.eventKey === 'Backspace') {
            startValue = '';
        } else if (props.eventKey && props.eventKey.length === 1) {
            startValue = props.eventKey;
        } else {
            startValue = props.value;
        }
        if (startValue == null) {
            startValue = '';
        }

        updateValue(startValue);

        refInput?.current?.focus();
    }, []);

    const refInput = useRef<any>(null);

    return (
        <input
            ref={refInput}
            value={props.value || ''}
            onChange={(event) => updateValue(event.target.value)}
            className="my-simple-editor"
        />
    );
};
export default SimpleTextEditor