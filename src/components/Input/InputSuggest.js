import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import _ from 'lodash';

import "./InputSuggest.scss";

const isAlphaNumericChar = keycode => {
    return (keycode >= 48 && keycode <= 57) || (keycode >= 65 && keycode <= 90);
};

class InputSuggestion extends React.Component {
    constructor() {
        super();

        this.state = {
            textInput: '',
            suggestions: []
        };
        document.addEventListener('keydown', this.freeTyping.bind(this), false);
    }

    freeTyping(e) {
        if (!isAlphaNumericChar(e.keyCode)) {
            return;
        }
        if (e.target.value === undefined) {
            this.inputSearch.focus();
        }
    }

    getSuggestions = textInput => {
        // if (!textInput || textInput.length === 0) return []; //chưa nhập -> chưa gợi ý
        const inputValue = textInput.trim().toLowerCase();

        if (!this.props.inputsWithIndex) {
            return [{ textInput: textInput }];
        };
        let inputsWithIndex = this.props.inputsWithIndex;
        let keyArr = Object.keys(inputsWithIndex).filter(
            textInput => {
                return textInput.toLowerCase().indexOf(inputValue) >= 0
            }
        );
        var suggestArr = keyArr.map(function (key) {
            return inputsWithIndex[key];
        });

        return suggestArr;
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.inputSearch = autosuggest.input;
        }
    };

    shouldRenderSuggestions = value => {
        return true;
    };

    getSuggestionValue = suggestion => {
        this.props.onSelected(suggestion);
        return suggestion.displayName;
    }
    
    renderSuggestion = suggestion => {
        return (
            <div className="suggest-item">
                {suggestion.displayName}
            </div>
        );
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.sortSuggestions(this.getSuggestions(value), value)
        });
    };

    sortSuggestions(suggestions, value) {
        var results =  _.sortBy(suggestions, (element) => {
            return element.displayName
        })
        return results;
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, selected) => {
        this.props.onSelected(selected.suggestion)
        this.setState({
            textInput: selected.suggestion && selected.suggestion.displayName
        });
    };

    handleChangeInput = (event, { newValue }) => {
        this.setState({
            textInput: newValue || ''
        });
    };

    reset() {
        this.setState({
            textInput: ''
        });
        this.onSuggestionsFetchRequested({ value: '' });
    }

    handleBlurInput() {
        // this.setState({
        //     textInput: ''
        // });
    }

    render() {
        const { textInput, suggestions } = this.state;
        const inputProps = {
            value: textInput,
            className: "custom-form-control",
            onChange: this.handleChangeInput,
            onClick: () => {
                this.reset();
            },
            onBlur: () => {
                this.handleBlurInput();
            }
        };
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                highlightFirstSuggestion={true}
                inputProps={inputProps}
                ref={this.storeInputReference}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, null)(InputSuggestion);
