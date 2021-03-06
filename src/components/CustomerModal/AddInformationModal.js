import React from 'react';
import Modal from 'react-modal';
// import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import LoadButton from '../LoadButton';
import globalStyles from '../../theme/global.scss';
import buttonsStyles from '../../theme/buttons.scss';
import modalStyles from './index.scss';

const globalClass = className.bind(globalStyles);

const selectClassName = globalClass('formControl', 'selectCustomModal');

type Props = {
  data: Array<Object>,
  selectedCountry: Object,
  isOpened: boolean,
  handleInputName: () => void,
  inputValue: string,
  handleSelectCountry: () => void,
  onHandleAddInformation: (e: Object) => void,
  handleOpenCloseModal: () => void,
  isLoading: boolean,
  isFailed: boolean,
  errorMessage: string
};

const AddInformationModal = ({
  data,
  selectedCountry,
  isOpened,
  handleInputName,
  inputValue,
  handleSelectCountry,
  onHandleAddInformation,
  handleOpenCloseModal,
  isLoading,
  isFailed,
  errorMessage
}: Props) => {
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transition: 'transform .3s ease-out,-webkit-transform .3s ease-out',
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      border: 'none',
      overflow: 'hidden',
      WebkitOverflowScrolling: 'touch',
      borderRadius: 'none',
      outline: 'none',
      padding: '0',
      maxHeight: isFailed ? '600px' : '500px'
    }
  };
  const countryName = selectedCountry.name;
  const styleSubmit =
    inputValue.length >= 2
      ? `${buttonsStyles.buttonModalSelect} btn`
      : `${buttonsStyles.buttonModalAction} btn`;
  const isDisabledButton = inputValue.length >= 2;
  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={handleOpenCloseModal}
      style={customStyles}
      contentLabel="Create"
      ariaHideApp={false}
      className={`${modalStyles.modalDialogCreate} modal-dialog`}
    >
      <form
        onSubmit={e => onHandleAddInformation(e)}
        className={`${modalStyles.modalContent} modal-content`}
      >
        <div className={`${modalStyles.modalHeader} modal-header`}>
          <button
            type="button"
            className="close"
            onClick={handleOpenCloseModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={`${modalStyles.modalBody} modal-body text-left`}>
          <h4
            className={`${modalStyles.modalTitle} ${
              globalStyles.marginBottom30
            } modal-title`}
            id="modalLabel"
            style={{ marginBottom: '15px' }}
          >
            Add information
          </h4>
          <span className={`${modalStyles.modalRedisText} mt-0`}>
            For tax calculation, please, fill in the information below:
          </span>
          {isFailed && (
            <div className={globalStyles.errorMessage}>
              <span className={globalStyles.errorMessageText}>
                {errorMessage}
              </span>
            </div>
          )}
          <div
            className={`${globalStyles.formGroup} form-group`}
            style={{ paddingTop: 0 }}
          >
            <label
              htmlFor="countriesSelect"
              className={`${modalStyles.modalRedisText} mt-1`}
            >
              Choose your country
            </label>
            <select
              className={`${selectClassName} form-control custom-select`}
              id="countriesSelect"
              name="countries"
              onChange={e => handleSelectCountry(e.target.value)}
              value={countryName}
              required
            >
              {data.map(countryObject => (
                <option key={_.uniqueId()} value={countryObject.name}>
                  {countryObject.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`${globalStyles.formGroup} form-group`}
            style={{ paddingTop: 0 }}
          >
            <label
              htmlFor="nameProfile"
              className={`${modalStyles.modalRedisText} mt-2`}
            >
              Please, enter your name to continue:
            </label>
            <input
              type="text"
              id="nameProfile"
              className="form-control volume-form-input"
              placeholder="Name"
              value={inputValue}
              onChange={e => handleInputName(e.target.value)}
            />
          </div>
        </div>
        <div className={`${modalStyles.modalFooter} modal-footer`}>
          <button
            type="button"
            className={`${buttonsStyles.buttonModalCancel} btn`}
            onClick={handleOpenCloseModal}
          >
            Cancel
          </button>
          <LoadButton
            type="submit"
            buttonText="Send"
            isFetching={isLoading}
            baseClassButton={styleSubmit}
            disabled={!isDisabledButton}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddInformationModal;
