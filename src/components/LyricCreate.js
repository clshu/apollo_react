import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import AddLyricToSong from '../queries/addLyricToSong';

const LyricCreate = props => {
  const [addLyricToSong] = useMutation(AddLyricToSong);
  const [content, setContent] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    addLyricToSong({
      variables: { content, songId: props.songId }
    });
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Add A New Lyric</label>
        <input value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit">Add Lyric</button>
      </form>
    </div>
  );
};

export default LyricCreate;
