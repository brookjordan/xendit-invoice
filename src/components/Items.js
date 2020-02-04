import React from "react";
import Item from "./Item";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      items: null,
    };
  }

  componentDidMount() {
    fetch(`${apiURL}/item`, { credentials: "include" })
    .then((itemDataBuffer) => itemDataBuffer.json())
    .then(itemData => {
      this.setState({ items: itemData.items });
    });
  }

  render() {
    let items = this.state.items || [];
    debugger;
    return <>
      <header className="site-content__header">
        <h2 className="site-content__title">Items</h2>

        <div className="site-content__actions">
          <button className="site-content__action">Create new item</button>
        </div>
      </header>

      <ul className="card-list">{
        items.map(item => (
          <Item key={item.id} item={item} />
        ))
      }</ul>
    </>;
  };
}

export default App;
