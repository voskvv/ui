/* @flow */

import React from 'react';
import className from 'classnames/bind';

import InputControl from '../../../InputControl/index';

import globalStyles from '../../../../theme/global.scss';
import inputStyles from '../../../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  item: Object,
  index: number,
  handleChangeInputCommands: (value: string, id: string, index: number) => void
};

const Commands = ({ item, index, handleChangeInputCommands }: Props) => {
  const { command, id } = item;
  const joinedCommands = command.join(' ');
  return (
    <div className="row rowLine" id={`container${index + 1}-commands`}>
      <div className="col-md-12">
        <div className="containerTitle containerBlockTitle">
          Commands
          {/* <Tooltip */}
          {/* placement='top' */}
          {/* trigger={['hover']} */}
          {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
          {/* > */}
          {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
          {/* </Tooltip> */}
        </div>
      </div>
      <div className="col-md-11">
        <InputControl
          value={joinedCommands}
          id={`commands${id}`}
          type="text"
          baseClassName={`${formClassName} ${inputStyles.inputCustom}`}
          baseClassNameLabel={`${
            globalStyles.formGroupLabel
          } ${joinedCommands && globalStyles.formGroupLabelOnFocus}`}
          labelText="Entrypoint"
          textHelper="Example: top, -b"
          baseClassNameHelper={globalStyles.formGroupHelper}
          handleChangeInput={e =>
            handleChangeInputCommands(e.target.value, id, index)
          }
        />
      </div>
    </div>
  );
};

export default Commands;
