import PropTypes from 'prop-types';
import css from '../image-gallery.module.css';

const ImageGalleryItem = ({ alt, preview, fullSize, showImage }) => {
  return (
    <li
      onClick={() => {
        showImage(fullSize);
      }}
      className={css.imageGalleryIitem}
    >
      <img src={preview} alt={alt} className={css.imageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  fullSize: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};
