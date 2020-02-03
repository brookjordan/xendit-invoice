import React from "react";

class App extends React.Component {
  render() {
    return <>
      <header className="site-content__header">
        <h2 className="site-content__title">Items</h2>

        <div className="site-content__actions">
          <button className="site-content__action">Create new item</button>
        </div>
      </header>

      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
        <li>Item 7</li>
        <li>Item 8</li>
        <li>Item 9</li>
      </ul>
    </>;
  };
}

export default App;
