export const priority = {
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
    value: '-1'
  }
};

export const fields = {
  values: {
    DEADLINE: {
      label: 'Deadline',
      value: 'deadline',
      order: 'ASC'
    },
    PRIORITY: {
      label: 'Priority',
      value: 'priority',
      order: 'DESC'
    },
    NAME: {
      label: 'Name',
      value: 'name',
      order: 'ASC'
    },
    CREATED_AT: {
      label: 'Created at',
      value: 'createdAt',
      order: 'ASC'
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
