class ExpandableCard {
  constructor({
    rootEl,
    cardSelector,
    toggleSelector = '[data-role="toggleBudgetCard"]',
    bodySelector,
    openClass = "budget__card--open",
    parentBodySelector = null,
    parentCardSelector = null,
    parentOpenClass = null,

    // anything matching these should NOT trigger toggle
    ignoreSelector = `
      [data-no-toggle="true"],
      .budget__delete-btn,
      .bill__delete-btn,
      .modal__submit_btn,
      .modal__close-btn,
      .add__btn,
      input,
      select,
      textarea,
      a,
      label`,
  }) {
    if (!rootEl) throw new Error("ExpandableCard: rootEl is required");

    this._rootEl = rootEl;
    this._cardSelector = cardSelector;
    this._toggleSelector = toggleSelector;
    this._bodySelector = bodySelector;
    this._openClass = openClass;

    this._parentBodySelector = parentBodySelector;
    this._parentCardSelector = parentCardSelector;
    this._parentOpenClass = parentOpenClass;
    this._ignoreSelector = ignoreSelector.replace(/\s+/g, " ").trim();

    this._handleClick = this._handleClick.bind(this);
  }

  _init() {
    this._rootEl.addEventListener("click", this._handleClick);
  }

  destroy() {
    this._rootEl.removeEventListener("click", this._handleClick);
  }

  _handleClick(e) {
    e.stopPropagation();
    if (e.target.closest("[data-no-toggle='true']")) {
      return;
    }

    // 1) If user clicked an "action" control, do NOT toggle
    if (e.target.closest(this._ignoreSelector)) return;

    //e.stopPropagation();
    const toggle = e.target.closest(this._toggleSelector);
    if (!toggle) return;

    const card = toggle.closest(this._cardSelector);
    if (!card) return;

    const body = card.querySelector(this._bodySelector);
    if (!body) return;
    const isOpen = card.classList.toggle(this._openClass);
    body.style.maxHeight = isOpen ? body.scrollHeight + "px" : "0px";

    this._refreshParentHeight(card);
  }

  /*_refreshAll() {
    // optional: call after adding/removing content inside open cards
    this._rootEl.querySelectorAll(this._card).forEach((card) => {
      if (!card.classList.contains(this._openClass)) return;
      const body = card.querySelector(this._body);
      if (body) body.style.maxHeight = body.scrollHeight + "px";
    });
  }*/
  _refreshParentHeight(card) {
    if (!this._parentBodySelector || !this._parentCardSelector) return;

    const parentCard = card.closest(this._parentCardSelector);
    if (!parentCard) return;

    if (
      this._parentOpenClass &&
      !parentCard.classList.contains(this._parentOpenClass)
    ) {
      return;
    }

    const parentBody = parentCard.querySelector(this._parentBodySelector);
    if (parentBody) {
      parentBody.style.maxHeight = parentBody.scrollHeight + "px";
    }
  }
}

export default ExpandableCard;
