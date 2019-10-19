import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import AddSong from '../queries/addSong';
import FetchSongList from '../queries/fetchSongList';

const SongCreate = () => {
  let input;
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

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            addSong({ variables: { title: input.value } });
            input.value = '';
          }}
        >
          <label>Song Title:</label>
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Song</button>
        </form>
      </div>
    </div>
  );
};

export default SongCreate;
