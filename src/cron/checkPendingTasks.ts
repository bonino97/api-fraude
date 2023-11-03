import cron from 'node-cron';

const checkPendingTables = async () => {
  // TODO: check pending links
};

export const checkPendingTasks = () => {
  cron.schedule('*/30 * * * * *', () => {
    checkPendingTables();
  });
};
