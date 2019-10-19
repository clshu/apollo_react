import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import FetchSong from '../queries/fetchSong';
import LyricCreate from '../components/LyricCreate';
import LyricList from '../components/LyricList';

const SongDetail = props => {
  // extract /songs/:id, new style after react router v5
  const { id } = useParams();
  const { loading, error, data } = useQuery(FetchSong, { variables: { id } });

  if (loading) return <div></div>;
  if (error) return `Error! ${error.message}`;

  const { song } = data;

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={song.id} />
    </div>
  );
};

export default SongDetail;
