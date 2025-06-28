import { StringInputProps, useFormValue } from "sanity";

export const InputField = (props: StringInputProps) => {

  const value = useFormValue(['description']);

  return (
    <div>
      <p>Input Field Component skriv: 1337 for lættis styling</p>
      {props.value == '1337' && (
        <div style={{ backgroundColor: 'yellow', padding: '10px', borderRadius: '5px' }}>
          <p style={{ color: 'red', fontWeight: 'bold' }}>Lættis styling applied!</p>
        </div>
      )}
      {props.renderDefault(props)}

      <p>Current value: {value?.toString()}</p>
    </div>
  );
}