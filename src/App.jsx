import { Component } from 'react';
import { Button } from 'components/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { Searchbar } from './components/Searchbar';

import { fetchImagesWithQuery } from './services/api';
import Modal from 'components/Modal/Modal';

import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    hits: [],
    searchQuery: '',
    pictures: [],
    totalHits: '',
    page: 1,
    errorMsg: '',
    isLoading: false,
    activeImg: null,
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

  async loadResults() {
    const { searchQuery, per_page, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const images = await fetchImagesWithQuery(searchQuery, per_page, page);
      if (images.length) {
        this.setState(prevState => ({
          hits: page > 1 ? [...prevState.hits, ...images] : images,
        }));
        this.setState({ isLoading: false });
      } else {
        // add ToastContainer
        toast.error(
          `Sorry, there are no images matching your search query. Please try again.`,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          }
        );
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error,
      });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  setActiveImg = activeImg => {
    this.setState({
      activeImg,
    });
  };

  render() {
    const { hits, activeImg, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {hits.length > 0 && (
          <ImageGallery images={hits} openModal={this.setActiveImg} />
        )}

        {hits.length > 0 && <Button onClick={this.loadMore} />}
        {activeImg && (
          <Modal
            largeImageURL={activeImg}
            onClose={() => this.setActiveImg(null)}
          >
            <img src={activeImg} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
