import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import LikeLyric from '../queries/likeLyric';

const LyricList = props => {
  const [likeLyric] = useMutation(LikeLyric);

  const onClick = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  };

  const renderList = lyrics => {
    return lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i className="material-icons" onClick={() => onClick(id, likes)}>
              thumb_up
            </i>

            {likes}
          </div>
        </li>
      );
    });
  };

  return <ul className="collection">{renderList(props.lyrics)}</ul>;
};

export default LyricList;
