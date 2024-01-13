
function foodieButton( { label, onClick, disabled, margin, darkmode} ) {
    const buttonStyle = {
        border: '2px solid black',
        borderRadius: '20px',
        backgroundColor: disabled
            ? 'lightgrey'
            : darkmode
                ? 'black'
                : 'transparent',
        color: disabled ? 'grey' : darkmode ? 'white' : 'black',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
        margin: margin || '0',
    };

  return (
      <button
          style={buttonStyle}
          onClick={onClick}
          disabled={disabled}
      >
          {label}
      </button>
  );
}

export default foodieButton;