import classNames from 'classnames';
import Downshift from 'downshift';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';

import dropdownIconSrc from 'img/drop-down.svg';
import clearInputIconSrc from 'img/error.svg';

import './Typeahead.scss';


/**
 *  This is a generic typeahead component. It can be used for static lists or
 *  even lists that require api calls. See all the props for various options.
 *
 *  @prop {array<*>} stories              A collection of things to render. This array can contain any type, as long
 *                                        as every element is of the same type. The other required props will define
 *                                        how the list/results will render.
 *  @prop {string}   [defaultInputValue]  A string with which to populate the input on initial render.
 *  @prop {*}        [selectedResult]     Setting a default result which will have appropriate styling in the given
 *                                        `collection` list.
 *  @prop {boolean}  [disabled]           Set this to `true` to disable the input.
 *  @prop {function} filterCollection     A function with the signature `(inputValue, result, index)` which defines
 *                                        how the `inputValue` will filter the list of results.
 *  @prop {boolean}  [isLoading]          If truthy, the list will be displayed containing a single item which indicates
 *                                        that there are no matching results for the `inputValue`.
 *  @prop {function} [onChange]           Callback that is fired when the input's value changes.
 *  @prop {function} [onSelect]           Callback that is fired when the a result is selected. It passes only the
 *                                        associated value from the `collection`.
 *  @prop {string}   [placeholder]        Placeholder text for the input.
 *  @prop {*}        [renderCustomResult] If `isLoading` is not truthy, this will be the only thing rendered.
 *  @prop {function} renderResult         A function called with `(result, index)` that should return the desired markup
 *                                        for a single result in the list.
 *  @prop {function} [resultKey]          A function that defines how to generate a key for a result in the list.
 *                                        React requires this prop on arrays of elements in order to keep track of
 *                                        rendering/re-rendering when props change. It's signature is `(result, index)`
 *                                        and, by default, it uses `result.id`.
 *  @prop {function} resultToString       This function should return a value to be rendered in the input based on a
 *                                        selected result. Understandably, its signature is simply `(result)`.
 */
export default function Typeahead(props) {
  console.groupCollapsed('[Typeahead]');
  const {
    collection,
    selectedResult,
    filterCollection,
    onChange,
    onSelect,
    placeholder,
    renderResult,
    resultKey,
    resultToString,
  } = props;
  console.log('props: %o', props);

  const [inputRef] = useState(React.createRef());
  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedResult);

  const [inputValueEdited, setInputValueEdited] = useState(false);




  console.log('collection: %o', collection);
  // console.log('highlightedIndex: %o', highlightedIndex);
  // console.log('inputValue: %o', inputValue);
  console.log('isActive: %o', isActive);
  // console.log('isOpen: %o', isOpen);
  // console.log('selectedItem: %o', selectedItem);


  // Downshift.stateChangeTypes.unknown
  // Downshift.stateChangeTypes.mouseUp
  // Downshift.stateChangeTypes.itemMouseEnter
  // Downshift.stateChangeTypes.keyDownArrowUp
  // Downshift.stateChangeTypes.keyDownArrowDown
  // Downshift.stateChangeTypes.keyDownEscape
  // Downshift.stateChangeTypes.keyDownEnter
  // Downshift.stateChangeTypes.clickItem
  // Downshift.stateChangeTypes.blurInput
  // Downshift.stateChangeTypes.changeInput
  // Downshift.stateChangeTypes.keyDownSpaceButton
  // Downshift.stateChangeTypes.clickButton
  // Downshift.stateChangeTypes.blurButton
  // Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem
  function stateReducer(state, changes) {
    console.groupCollapsed('[stateReducer]');
    console.log('state: %o', state);
    console.log('changes: %o', changes);

    let newChanges = {
      ...changes,
      highlightedIndex: state.highlightedIndex,
    };


    if (changes.isOpen) {
      setInputValueEdited(false);
    }


    switch (changes.type) {
      case Downshift.stateChangeTypes.blurInput:
        // inputRef.current.setSelectionRange(0, 0);
        // if ()
          // newChanges
        break;

      case Downshift.stateChangeTypes.changeInput:
        setInputValueEdited(true);
        break;

      case Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem: {
        const highlightedIndex = collection.findIndex(item => item === state.selectedItem);

        if (highlightedIndex !== -1) {
          newChanges.highlightedIndex = highlightedIndex;
        } else {
          console.warn('[Typeahead] Unable to locate new selectedItem in the collection!');
        }
      } break;

      default:
        newChanges = changes;
    }

    console.log('returning newChanges: %o', newChanges);

    console.groupEnd();
    return newChanges;
  }

  function getFilteredCollection(downshiftProps) {
    console.groupCollapsed('[getFilteredCollection]');
    const {
      inputValue,
      isOpen,
      itemToString,
      selectedItem,
    } = downshiftProps;

    let results = collection;

    if (selectedItem) {
      console.log('we have a selected item')
      const selectedItemString = itemToString(selectedItem);
      const valueMatchesSelected = inputValue === selectedItemString;
      console.log('selectedItemString: %o', selectedItemString);
      console.log('valueMatchesSelected: %o', valueMatchesSelected);

      if (!valueMatchesSelected || (valueMatchesSelected && inputValueEdited)) {
        console.log('filtering with filterCollection(%o, ...filterArgs)', inputValue)
        results = collection.filter((...filterArgs) => filterCollection(inputValue, ...filterArgs));
      }
    } else {
      console.log('no selected item; result = collection')
      // results = collection.filter((...filterArgs) => filterCollection(inputValue, ...filterArgs));
    }


    console.log('returning: %o', results)
    console.groupEnd();
    return results;
  }


  function handleInputValueChange(value) {
    // console.log('clear click')
    // setInputValue(value);
    onChange(value);
  }

  function handleResultSelect() {
    inputRef.current.blur();
  }

  function handleOuterClick(downshiftProps) {
    console.log('outerClick %o', downshiftProps)
    const {
      clearSelection,
      inputValue,
    } = downshiftProps;

    // setIsOpen(false);
  }

  // while it's generally good practice to have a handle* function
  // for each handler needed in the component, this is required to
  // get tests passing as this callback gets called with
  // `(result, downshiftProps)` and the test only needs the result.
  function handleResultClick(result) {
    console.log('result click')
    setSelectedItem(result);
    onSelect(result);
  }

  function handleStateChange(changes, downshiftProps) {
    console.log('[handleStateChange] (%o, %o)', changes, downshiftProps)
  }


  // clearSelection        function(cb: Function)  clears the selection
  // clearItems            function()  Clears downshift's record of all the items. Only really useful if you render your items asynchronously within downshift. See #186
  // closeMenu             function(cb: Function)  closes the menu
  // openMenu              function(cb: Function)  opens the menu
  // selectHighlightedItem function(otherStateToSet: object, cb: Function) selects the item that is currently highlighted
  // selectItem            function(item: any, otherStateToSet: object, cb: Function)  selects the given item
  // selectItemAtIndex     function(index: number, otherStateToSet: object, cb: Function)  selects the item at the given index
  // setHighlightedIndex   function(index: number, otherStateToSet: object, cb: Function)  call to set a new highlighted index
  // toggleMenu            function(otherStateToSet: object, cb: Function) toggle the menu open state
  // reset                 function(otherStateToSet: object, cb: Function) this resets downshift's state to a reasonable default
  // setItemCount          function(count: number) this sets the itemCount. Handy in situations where you're using windowing and the items are loaded asynchronously from within downshift (so you can't use the itemCount prop.
  // unsetItemCount        function()  this unsets the itemCount which means the item count will be calculated instead by the itemCount prop or based on how many times you call getItemProps.
  // setState              function(stateToSet: object, cb: Function)  This is a general setState function. It uses downshift's internalSetState function which works with control props and calls your onSelect, onChange, etc. (Note, you can specify a type which you can reference in some other APIs like the stateReducer).


  function renderControls(downshiftProps) {
    // console.log('downshiftProps: %o', downshiftProps)
    const {
      getInputProps,
      getToggleButtonProps,

      inputValue,
      openMenu,
    } = downshiftProps;


    return (
      <div className="Typeahead--control">
        <button
          {...getToggleButtonProps({
            type: "button",
            className: "Typeahead--toggle-results",
            'aria-label': "Clear current input text",
            onClick: () => {
              console.log('toggle click')
              // setIsOpen(true)
              // inputRef.current.focus();
            },
          })}
        >
          <SVG src={dropdownIconSrc} />
        </button>

        <input
          ref={inputRef}
          {...getInputProps({
            placeholder,
            onFocus: () => {
              console.log('input focus')
              setIsActive(true);
              openMenu();
              inputRef.current.setSelectionRange(0, inputValue.length);
            },
            onBlur: () => {
              console.log('input blur')
              setIsActive(false);
              inputRef.current.setSelectionRange(0, 0);
            },
          })}
        />

        {false && (<button
                          type="button"
                          className="Typeahead--clear-input"
                          aria-label="Clear current input text"
                          onClick={() => {
                            console.log('clear click')
                            // setInputValue('');
                            // inputRef.current.focus();
                          }}
                        >
                          <SVG src={clearInputIconSrc} />
                        </button>)}
      </div>
    );
  }

  function renderMenuItems(downshiftProps) {
    const {
      getItemProps,
      highlightedIndex,

      inputValue,
      itemToString,
      isOpen,
      selectedItem,
    } = downshiftProps;
    console.log('[Typeahead renderMenuItems] highlightedIndex: %o', highlightedIndex)

    let menuItems = null;


    if (isOpen) {
      /* eslint-disable react/jsx-key */
      menuItems = getFilteredCollection(downshiftProps)
        .map((result, index) => {
          const liClasses = classNames({
            highlighted: highlightedIndex === index,
            selected: selectedItem === result,
          });

          return (
            <li
              {...getItemProps({
                key: resultKey(result, index),
                item: result,
                index,
                className: liClasses,
                title: itemToString(result),
              })}
            >
              {renderResult(result, index)}
            </li>
          );
        }
      );
      /* eslint-enable react/jsx-key */
    }

    return menuItems;
  }

  function renderTypeahead(downshiftProps) {
    const { isOpen } = downshiftProps;
    const classes = classNames('Typeahead', {
      'Typeahead--is-open': isOpen,
      'Typeahead--active': isActive,
    });


    return (
      <div className={classes}>
        {renderControls(downshiftProps)}
        <ul
          {...downshiftProps.getMenuProps({
            className: 'Typeahead--results',
            tabIndex: isOpen ? null : -1,
          })}
        >
          {renderMenuItems(downshiftProps)}
        </ul>
      </div>
    );
  }


  useEffect(() => {
    // defaultInputValue && setInputValue(defaultInputValue);

    if (selectedResult) {
      // window.selectedResult = selectedResult;
      // window.collection = collection;
      // const itemIndex = collection.findIndex(item => item === selectedResult);
      // setHighlightedIndex(itemIndex);
      setSelectedItem(selectedResult);
    }
  }, [selectedResult]);


  console.groupEnd();
  // debounce(handleInputValueChange, 10/*, { leading: true, trailing: false }*/)
      // isOpen={isOpen}
      // selectedItem={selectedItem}
      // inputValue={inputValue}
      // onInputValueChange={handleInputValueChange}
      // highlightedIndex={undefined}
      // onOuterClick={handleOuterClick}
      // onStateChange={handleStateChange}
  return (
    <Downshift
      selectedItem={selectedItem}
      stateReducer={stateReducer}
      onSelect={handleResultSelect}

      onChange={handleResultClick}
      itemToString={resultToString}
    >
      {renderTypeahead}
    </Downshift>
  );
}


Typeahead.displayName = 'Typeahead';

Typeahead.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.any),
  defaultInputValue: PropTypes.string,
  selectedResult: PropTypes.any,
  disabled: PropTypes.bool,
  filterCollection: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  // renderResult: PropTypes.func.isRequired,
  resultKey: PropTypes.func,
  resultToString: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
};

Typeahead.defaultProps = {
  collection: [],
  disabled: false,
  filterCollection: () => true,
  onChange: () => null,
  onSelect: () => null,
  placeholder: 'Start typing to search...',
  resultKey: result => result,
};
