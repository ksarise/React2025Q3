import { Component } from 'react';

export default class Error extends Component {
  render() {
    return (
      <div className="mx-auto h-[100vh] flex flex-col justify-center items-center ">
        <div className="">
          <h1 className="text-red-500 py-2 text-6xl font-bold shadowed">
            I Crashed
          </h1>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }
}
