import React from 'react';
import {Link} from 'react-router-dom';
import {getApiErrorMessage, imageUrl, numberAsCurrency} from '../../../../common/helpers';
import {removeFavoriteAPI} from '../../../../api';
import {toast} from 'react-toastify';

class FavoriteItem extends React.PureComponent {
  toggleFavorite = (event) => {
    const {onRemoved} = this.props;
    event.preventDefault();
    event.stopPropagation();
    const {item} = this.props;
    removeFavoriteAPI(item.id).then(() => {
      onRemoved(item.id);
    }).catch(error => {
      toast.error(getApiErrorMessage(error));
    });
  };

  render() {
    const {item} = this.props;
    const avatar = item.images?.[0];
    return (
      <div className="favorite">
        <Link className="favorite__link" to={`/rooms/${item.id}`}>
          <div className="favorite__img" style={{backgroundImage: `url(${imageUrl(avatar?.url)})`}}/>
          <div className="favorite__info">
            <div className="wrap">
              <h3 className="title">{item.title}</h3>
              {
                item.area && <div className="area">{item.area} m2</div>
              }
              <div className="price">{numberAsCurrency(item.price)}</div>
            </div>
            <div className="address">{item.province?.name}</div>
          </div>
          <div className="favorite__action" title="Xóa" onClick={this.toggleFavorite}>
            <i className="material-icons">delete_outline</i>
          </div>
        </Link>
      </div>
    );
  }
}

export default FavoriteItem;
