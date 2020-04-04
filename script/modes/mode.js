class Mode {
  constructor(label, icon=null) {
    this.label = label;
    this.icon = icon
    this.active = false;

    // push the label name to the available_modes global variable
    // to keep track of modes initialized
    if (available_modes != undefined) {
      available_modes.push(this.label);
    }
  }

  get getLabel() {
    return this.label;
  }

  set setLabel(_label) {
    this.label = _label;
  }

  activeStatus(_active=null) {
    if (_active == null) { return this.active }

    this.active = _active;
  }

  // returns an object structured for the Menu Object to register
  // this mode as an option (and show the button)
  getOption() {
    return {
      label: this.label,
      icon: this.icon,
      active: () => { return this.activeStatus() },
      activate: () => { this.activeStatus(true) },
      deactivate: () => { this.activeStatus(false) }
    }
  }
}
