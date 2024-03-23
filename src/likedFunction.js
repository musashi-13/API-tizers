import React, { useState } from 'react';

function ToggleButton() {
  const [value, setValue] = useState(0);

  const toggleValue = () => {
    setValue(value === 0 ? 1 : 0);
  };

  return (
    <div>
      <button onClick={toggleValue}>Toggle</button>
      <p>Current Value: {value}</p>
    </div>
  );
}

export default ToggleButton;
