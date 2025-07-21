import React from 'react';

interface ErrorButtonProps {
  onClick: () => void;
}

class ErrorButton extends React.Component<ErrorButtonProps> {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="text-white bg-red-600 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        Test Error Boundary
      </button>
    );
  }
}

export default ErrorButton;
