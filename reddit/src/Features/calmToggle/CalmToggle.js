import React from 'react';

const CalmToggle = () => {
  return (
    <>
      <div className='custom-control custom-switch me-auto'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitches'
          readOnly
          data-toggle="toggle"
        />
        <label className='custom-control-label' htmlFor='customSwitches'>
          Calmer
        </label>
      </div>

    </>
  );
};

export default CalmToggle;