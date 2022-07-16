import { Component } from 'react';
// import { ImageGallery } from './components/ImageGallery';

import ImageGallery from './components/ImageGallery/ImageGallery';
import { Searchbar } from './components/Searchbar';
// import { Button } from './components/Button';

import { fetchImagesWithQuery } from './services/api';

export class App extends Component {
  state = {
    hits: [],
    searchQuery: '',
    pictures: [],
    totalHits: '',
    page: 1,
    errorMsg: '',
    isLoading: false,
    showModal: false,
    modalImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevsearchQuery = prevState.searchQuery;
    const searchQuery = this.state.searchQuery;

    if (prevPage !== nextPage || prevsearchQuery !== searchQuery) {
      this.loadResults();
    }
  }

  loadResults = () => {
    const { page, per_page } = this.state;

    this.setState({ isLoading: true });

    fetchImagesWithQuery(this.state.searchQuery, per_page, page)
      .then(hits => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          errorMsg: '',
        }));
      })
      .catch(error =>
        this.setState({
          errorMsg: 'Error while loading data. Try again later.',
        })
      )
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = queryFromSearchbar => {
    this.setState({ searchQuery: queryFromSearchbar, hits: [], page: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <>
        <h1>Test</h1>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.hits.length > 0 ? (
          <ImageGallery images={this.state.hits} />
        ) : (
          'No results'
        )}
        {/* <Button /> */}
        <button onClick={this.loadMore}>Load more</button>
      </>
    );
  }
}