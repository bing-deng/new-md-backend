const advancedOperation1 = [
  {
    key: 'op1',
    type: 'Registered',
    name: 'Jacky',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Friend of Teacher Lee',
  },
  {
    key: 'op2',
    type: 'Registered',
    name: 'Jacky',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Fake ID',
  },
  {
    key: 'op3',
    type: 'Interviewing',
    name: 'Jacky',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Tattoo on his left arm',
  },
  {
    key: 'op4',
    type: 'Interviewing',
    name: 'Lee',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Great Japanese skill',
  },
  {
    key: 'op5',
    type: 'Interviewing',
    name: 'Jacky',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

export default {
  'GET  /api/profile/advanced': getProfileAdvancedData,
};
