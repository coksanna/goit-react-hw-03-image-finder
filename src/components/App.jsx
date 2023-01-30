import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { searchImages } from './services/pixabay-api';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    fullSize: '',
    tags: 0,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImages(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    if (search === this.state.search) {
      return;
    }
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = data => {
    this.setState({
      fullSize: data,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const { items, loading, showModal, fullSize, tags, page, total } =
      this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;
    const totalPage = Math.ceil(total / 12);

    return (
      <>
        <Searchbar onSubmit={searchImages} />

        {items.length > 0 && (
          <ImageGallery items={items} showImage={showImage} />
        )}

        {items.length > 0 && page < totalPage && !loading && (
          <Button loadMore={loadMore} />
        )}

        {loading && <Loader text="Loading..." />}

        {showModal && (
          <Modal close={closeModal}>
            <img src={fullSize} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
