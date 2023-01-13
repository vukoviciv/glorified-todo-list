export const priority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  get list() {
    return [
      this.HIGH,
      this.MEDIUM,
      this.LOW
    ];
  }
};
