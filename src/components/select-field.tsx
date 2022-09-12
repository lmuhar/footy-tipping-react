import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { OverrideProps } from '@material-ui/core/OverridableComponent';
import Select from '@material-ui/core/Select';
import { PropsWithChildren } from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  control: any;
  defaultValue: any;
}

const ReactHookFormSelect = ({ name, label, control, defaultValue, children, ...props }: PropsWithChildren<Props>) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={
          <Select labelId={labelId} label={label}>
            {children}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;
