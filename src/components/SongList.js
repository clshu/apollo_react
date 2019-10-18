import '../style/style.css';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import FetchSongList from '../queries/fetchSongList';
import { Link } from 'react-router-dom';

const onSongDelete = id => {
  console.log('id: ' + id);
};

const renderSongs = songs => {
  return songs.map(({ id, title }) => {
    return (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons" onClick={() => onSongDelete(id)}>
          delete
        </i>
      </li>
    );
  });
};

const SongList = () => {
  const { loading, error, data } = useQuery(FetchSongList);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul className="collection">{renderSongs(data.songs)}</ul>
      <Link to="/songs/new" className="btn-floating btnplarge red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
