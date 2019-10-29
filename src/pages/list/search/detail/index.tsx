import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Icon,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import classNames from 'classnames';
import { connect } from 'dva';
import { AdvancedProfileData } from './data.d';
import styles from './style.less';

const { Step } = Steps;
const ButtonGroup = Button.Group;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const mobileMenu = (
  <Menu>
    <Menu.Item key="1">Reject</Menu.Item>
  </Menu>
);

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<Icon type="down" />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            Interviewing
          </Dropdown.Button>
        );
      }
      return (
        <Fragment>
          <ButtonGroup>
            <Button type="danger">Reject</Button>
            {/* <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <Icon type="ellipsis" />
              </Button>
            </Dropdown> */}
          </ButtonGroup>
          <Button type="primary">Approved</Button>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="Status" value="Interviewing" />
    <Statistic title="Paid" value={0} prefix="$" />
  </div>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="Responsible">Operator1</Descriptions.Item>
        <Descriptions.Item label="Source">Website registration</Descriptions.Item>
        <Descriptions.Item label="Created Time">2019-10-07</Descriptions.Item>
        <Descriptions.Item label="Related">
          none
        </Descriptions.Item>
        <Descriptions.Item label="Last Updated Time">2017-07-07 ~ 2017-08-08</Descriptions.Item>
        <Descriptions.Item label="Last memo">Will come to visit Mrs Lee at 2019-10-15 10am</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      Web registration
    </Fragment>
    <div>2019-10-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      Operator1
    </Fragment>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (
  dot: React.ReactNode,
  {
    status,
  }: {
    status: string;
  },
) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }
  return dot;
};

const operationTabList = [
  {
    key: 'tab1',
    tab: 'Comments',
  },
  // {
  //   key: 'tab2',
  //   tab: '操作日志二',
  // },
  // {
  //   key: 'tab3',
  //   tab: '操作日志三',
  // },
];

const columns = [
  {
    title: 'Status before',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Operator',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status Changed',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text="Approved" />;
      }
      return <Badge status="error" text="Rejected" />;
    },
  },
  {
    title: 'Time',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Comment',
    dataIndex: 'memo',
    key: 'memo',
  },
];

interface DetailState {
  operationKey: string;
  tabActiveKey: string;
}

@connect(
  ({
    listAndsearchAnddetail,
    loading,
  }: {
    listAndsearchAnddetail: AdvancedProfileData;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    listAndsearchAnddetail,
    loading: loading.effects['listAndsearchAnddetail/fetchAdvanced'],
  }),
)
class Detail extends Component<
  { loading: boolean; listAndsearchAnddetail: AdvancedProfileData; dispatch: Dispatch<any> },
  DetailState
> {
  public state: DetailState = {
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listAndsearchAnddetail/fetchAdvanced',
    });
  }

  onOperationTabChange = (key: string) => {
    this.setState({ operationKey: key });
  };

  onTabChange = (tabActiveKey: string) => {
    this.setState({ tabActiveKey });
  };

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { listAndsearchAnddetail, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = listAndsearchAnddetail;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title="Win Ko Ko Kyu"
        extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
        tabList={[
          {
            key: 'detail',
            tab: 'Details',
          },
          {
            key: 'rule',
            tab: 'Comments',
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <Card title="Progress" style={{ marginBottom: 24 }}>
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    progressDot={customDot}
                    current={1}
                  >
                    <Step title="Registered" description={desc1} />
                    <Step title="Interviewing" description={desc2} />
                    <Step title="Approved" />
                    <Step title="Graduated" />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>
            <Card title="Profile" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions style={{ marginBottom: 24 }}>
                <Descriptions.Item label="Name">Win Ko Ko Kyu</Descriptions.Item>
                <Descriptions.Item label="Gender">M</Descriptions.Item>
                <Descriptions.Item label="Age">32</Descriptions.Item>
                <Descriptions.Item label="Marital status">Married</Descriptions.Item>
                <Descriptions.Item label="Ethnicity">Bamar</Descriptions.Item>
                <Descriptions.Item label="Identification number">5/Ta Ma Na (N) 051074</Descriptions.Item>
                <Descriptions.Item label="Faith">Buddhism</Descriptions.Item>
                <Descriptions.Item label="Address">Sandaku (7),TAMU,Sagaing Region</Descriptions.Item>
                <Descriptions.Item label="Phone number">09423713277</Descriptions.Item>
              </Descriptions>
              <Descriptions style={{ marginBottom: 24 }} title="Skills">
                <Descriptions.Item label="Japanese Level">N4</Descriptions.Item>
              </Descriptions>
              <Card type="inner" >
                <Descriptions style={{ marginBottom: 16 }} title="Experience" column={1}>
                  <Descriptions.Item label="2015-09-01">
                  Deferse Service (Scierce and Technolagy Reseach Center)
                  </Descriptions.Item>
                  <Descriptions.Item label="2015-09-01">
                  Research Engineering Officer 
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions title="Education" column={1}>
                <Descriptions.Item label="2015-09-01">
                Graduated Defense Services
                  </Descriptions.Item>
                  <Descriptions.Item label="2015-09-01">
                  Technological Academy
                  </Descriptions.Item>
                  <Descriptions.Item label="2015-09-01">
                  1st Year (Geology) Pyay University
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Card>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
