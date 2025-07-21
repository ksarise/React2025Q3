import React from 'react';
import Search from '../Search/Search.tsx';
import type { HeaderProps } from '../../types';

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <header className="bg-black py-4 px-6 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-red-600 mr-6">almost.fm</h1>
        </div>
        <Search
          onQuery={this.props.onQuery}
          initialQuery={this.props.initialQuery}
        />
      </header>
    );
  }
}

export default Header;
