import { Component } from 'react';
import {
  SearchbarStyled,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleChange(e) {
    this.setState({ searchQuery: e.currentTarget.value });
  }

  render() {
    return (
      <>
        <SearchbarStyled className="searchbar">
          <SearchForm className="form" onSubmit={this.handleSubmit}>
            <SearchFormInput
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchQuery}
              onChange={e => this.handleChange(e)}
            />
            <SearchFormButton type="submit" className="button">
              <SearchFormButtonLabel className="button-label">
                Search
              </SearchFormButtonLabel>
            </SearchFormButton>
          </SearchForm>
        </SearchbarStyled>
      </>
    );
  }
}
