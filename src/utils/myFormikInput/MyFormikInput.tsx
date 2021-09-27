import React from 'react';
import { Field, useField } from 'formik';
import classnames from 'classnames';

import classes from './myFormikInput.module.scss';

interface Props {
  name: string;
  className?: string;
  type: string;
  placeholder: string;
  as: any;
}

const MyFormikInput: React.FC<Props> = (props) => {
  const [field] = useField(props);
  return (
    <div className={classnames(classes.inputContainer, props.className)}>
      <Field {...field} {...props} />
    </div>
  );
};

export default MyFormikInput;
