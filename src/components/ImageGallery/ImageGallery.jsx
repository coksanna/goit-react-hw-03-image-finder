import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import css from './image-gallery.module.css';

const ImageGallery = ({ items, showImage }) => {
  const elements = items.map(({ id, tags, webformatURL, largeImageURL }) => (
    <ImageGalleryItem
      key={id}
      alt={tags}
      preview={webformatURL}
      fullSize={largeImageURL}
      showImage={showImage}
    />
  ));

  return <ul className={css.imageGallery}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  showImage: PropTypes.func.isRequired,
};
