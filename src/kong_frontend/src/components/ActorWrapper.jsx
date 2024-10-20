import React from 'react';

const ActorWrapper = (actors) => {
  const WrapperComponent = ({ children }) => {
    return actors.reduce((acc, { Actor, Provider }) => {
      return (
        <Actor>
          <Provider>
            {acc}
          </Provider>
        </Actor>
      );
    }, children);
  };

  return WrapperComponent;
};

export default ActorWrapper;
