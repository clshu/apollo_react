import '../style/style.css';
import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import FetchSongList from '../queries/fetchSongList';
import DeleteSong from '../queries/deleteSong';

const SongList = () => {
  const { loading, error, data } = useQuery(FetchSongList);
  const [deleteSong] = useMutation(DeleteSong);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const renderSongs = songs => {
    return songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i
            className="material-icons"
            onClick={e =>
              deleteSong({
                variables: { id },
                optimisticResponse: null,
                update: cache => {
                  const { songs } = cache.readQuery({
                    query: FetchSongList
                  });
                  // filter out the deleted entry by id
                  const newSongs = songs.filter(song => song.id !== id);
                  cache.writeQuery({
                    query: FetchSongList,
                    data: { songs: newSongs }
                  });
                }
              })
            }
          >
            delete
          </i>
        </li>
      );
    });
  };

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
