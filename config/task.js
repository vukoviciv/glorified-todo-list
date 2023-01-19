export const priority = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
  get list() {
    return [
      this.HIGH,
      this.MEDIUM,
      this.LOW
    ];
  }
};
