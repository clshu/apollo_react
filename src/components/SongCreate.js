import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import AddSong from '../queries/addSong';
import FetchSongList from '../queries/fetchSongList';

const SongCreate = () => {
  const [title, setTitle] = useState('');
  const [addSong] = useMutation(AddSong, {
    // This triggers the UI update on SongList component
    // with the new song.
    update(
      cache,
      {
        data: { addSong }
      }
    ) {
      const { songs } = cache.readQuery({ query: FetchSongList });

      cache.writeQuery({
        query: FetchSongList,
        data: { songs: songs.concat([addSong]) }
      });
    }
  });

  const onSubmit = event => {
    if (title === '') {
      event.preventDefault();
      return false;
    }
    event.preventDefault();
    addSong({ variables: { title } });
    setTitle('');
    return false;
  };

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={onSubmit}>
          <label>Song Title:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <button type="submit">Add Song</button>
        </form>
      </div>
    </div>
  );
};

export default SongCreate;
