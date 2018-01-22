import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import icon from '../../../images/icon-create-dep.svg';

class Label extends Component {
	constructor() {
		super();
		this.state = this.initialState();
	}
	initialState() {
		return {
			labels: [{
				key: '',
				label: '',
				id: '_first'
			}]
		};
	}
	handleClickAddLabel() {
		this.setState({
			labels: [
				...this.state.labels,
				{
					key: '',
					label: '',
					id: '_' + Math.random().toString(36).substr(2, 9)
				}
			]
		})
	}
	handleClickRemoveLabel(id) {
		if (this.state.labels.length > 1) {
			const nextLabels = Object.assign({}, this.state).labels.filter((item) => {
				return item.id !== id;
			});
			this.setState({
				labels: nextLabels
			}, () => {
				this.props.onChangeInputLabels(this.state.labels);
			});
		} else {
			this.setState(this.initialState(), () => {
				this.props.onChangeInputLabels(this.state.labels);
			});
		}
	}
	handleChangeInputKey(e, id) {
		const nextState = Object.assign({}, this.state);
		nextState.labels.filter(item => {
			if (item.id === id) {
				item.key = e.target.value;
			}
		});
		this.setState({
			labels: nextState.labels
		}, () => {
			this.props.onChangeInputLabels(this.state.labels);
		});
	}
	handleChangeInputLabel(e, id) {
		const nextState = Object.assign({}, this.state);
		nextState.labels.filter(item => {
			if (item.id === id) {
				item.label = e.target.value;
			}
		});
		this.setState({
			labels: nextState.labels
		}, () => {
			this.props.onChangeInputLabels(this.state.labels);
		});
	}
    render() {
	    // console.log(this.state);
        return (
	        <div className="blockContainer blockContainerPadin" id="labels">
		        <div className="col-md-12">
			        <div className="containerTitle">Label
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
			        <div className="containerSubTitle">Enter Labels</div>
		        </div>
		        {
			        this.state.labels.map((item, index) => {
			        	const id = item.id;
				        return (
					        <div className="row marLeft" key={id}>
						        <div className="col-md-5 myColumn">
							        <div className="form-group">
								        <input
									        className="form-group__input-text form-control"
									        type="text"
									        id={`key${index}`}
									        pattern="(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?"
									        required title="error"
									        value={this.state.labels[index].id === id &&
									        this.state.labels[index].key}
									        onChange={(e) => {
										        this.handleChangeInputKey(e, id);
										        if (e.target.value.length === 0) {
											        document.getElementById(`key-form-group__label${index}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`key-form-group__label${index}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`key${index}`}
									        id={`key-form-group__label${index}`}
								        >Key</label>
								        {index === 0 && <div className="form-group__helper">Your Deployment name can only contain alphanumeric and characters</div>}
							        </div>
						        </div>
						        <div className="col-md-5 myColumn">
							        <div className="form-group">
								        <input
									        className="form-group__input-text form-control"
									        type="text"
									        id={`label${index}`}
									        pattern="(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?"
									        required title="error"
									        value={this.state.labels[index].id === id &&
									        this.state.labels[index].label}
									        onChange={(e) => {
										        this.handleChangeInputLabel(e, id);
										        if (e.target.value.length === 0) {
											        document.getElementById(`label-form-group__label${index}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`label-form-group__label${index}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`label${index}`}
									        id={`label-form-group__label${index}`}
								        >Label</label>
								        {index === 0 && <div className="form-group__helper">Your Deployment name can only contain alphanumeric and characters</div>}
							        </div>
						        </div>
						        <div
							        className="col-md-1"
							        onClick={() => this.handleClickRemoveLabel(id)}
						        >
							        <img src={icon} alt="delete" className="iconBasket" />
						        </div>
					        </div>
				        )
			        })
		        }

		        <div
			        className="addBlockBtn"
			        onClick={this.handleClickAddLabel.bind(this)}
		        >+ Add label</div>
	        </div>
        );
    }
}

Label.propTypes = {
	onChangeInputLabels: PropTypes.func.isRequired
};

export default Label;
