const { addAssigneesToIssue } = require('../../lib/github');
const { isIssueValid } = require('../../lib/utils');

const components = {
  Affix: 'ddcat1115',
  Alert: 'ddcat1115',
  Anchor: 'afc163',
  AutoComplete: 'yutingzhao1991',
  Avatar: 'valleykid',
  BackTop: 'yutingzhao1991',
  Badge: 'MrPeak',
  Breadcrumb: 'dengfuping',
  Button: 'afc163',
  Calendar: 'yesmeck',
  Card: 'ddcat1115',
  Carousel: 'valleykid',
  Cascader: 'yesmeck',
  Checkbox: 'yutingzhao1991',
  Collapse: 'ddcat1115',
  DatePicker: 'yesmeck',
  Divider: 'dengfuping',
  Dropdown: 'MrPeak',
  Form: 'benjycui',
  Grid: 'ddcat1115',
  Icon: 'yesmeck',
  Input: 'ddcat1115',
  InputNumber: 'afc163',
  Layout: 'afc163',
  List: 'nikogu',
  Mention: 'benjycui',
  Menu: 'valleykid',
  Message: 'nikogu',
  Modal: 'afc163',
  Notification: 'valleykid',
  Pagination: 'yutingzhao1991',
  Popconfirm: 'yesmeck',
  Popover: 'yesmeck',
  Progress: 'yesmeck',
  Radio: 'MrPeak',
  Rate: 'ddcat1115',
  Select: 'yutingzhao1991',
  Slider: 'yesmeck',
  Spin: 'MrPeak',
  Steps: 'afc163',
  Switch: 'valleykid',
  Table: 'yesmeck',
  Tabs: 'valleykid',
  Tag: 'yutingzhao1991',
  TimePicker: 'dengfuping',
  Timeline: 'dengfuping',
  Tooltip: 'yesmeck',
  Transfer: 'afc163',
  Tree: 'zombieJ',
  TreeSelect: 'zombieJ',
  Upload: 'dengfuping',
};

function assignOwner(on) {
  const handler = ({ payload }) => {
    const { issue } = payload;
    if (issue && !isIssueValid(issue)) {
      return;
    }
    const matches = payload.label.name.match(/Component: (.+)/);
    if (!matches) {
      return;
    }
    const component = matches[1];
    const owner = components[component];
    addAssigneesToIssue({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      number: issue ? issue.number : payload.pull_request.number,
      assignees: [owner],
    });
  };
  on('issues.labeled', handler);
  on('pull.request.labeled', handler);
}

module.exports = assignOwner;
