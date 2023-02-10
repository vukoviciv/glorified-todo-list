export const priority = {
  values: {
    HIGH: {
      label: 'High',
      value: 1
    },
    MEDIUM: {
      label: 'Medium',
      value: 0
    },
    LOW: {
      label: 'Low',
      value: -1
    }
  },
  get list() {
    return [
      this.values.HIGH,
      this.values.MEDIUM,
      this.values.LOW
    ];
  }
};

export const orderBy = {
  values: {
    DEADLINE: {
      label: 'Deadline',
      value: 'deadline'
    },
    PRIORITY: {
      label: 'Priority',
      value: 'priority'
    },
    NAME: {
      label: 'Name',
      value: 'name'
    },
    CREATED_AT: {
      label: 'Created at',
      value: 'createdAt'
    }
  },
  get list() {
    return [
      this.values.DEADLINE,
      this.values.PRIORITY,
      this.values.NAME,
      this.values.CREATED_AT
    ];
  }
};
