class ExpandableCard {
  constructor({ card, toggleBtn, body, openClass = "budget__card--open" }) {
    this._card = card;
    this._toggleBtn = toggleBtn;
    this._body = body;
    this._openClass = openClass;
  }

  _init() {
    this._toggleBtn.addEventListener("click", () => this._toggle());
  }

  _toggle() {
    const isOpen = this._card.classList.toggle(this._openClass);
    this._body.style.maxHeight = isOpen
      ? this._body.scrollHeight + "px"
      : "0px";
  }

  _refreshHeight() {
    if (this._card.classList.contains(this._openClass)) {
      this._body.style.maxHeight = this._body.scrollHeight + "px";
    }
  }
}

export default ExpandableCard;
