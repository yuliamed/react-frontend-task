import React, { Component } from 'react'
import { findAll, getInspectionOrder, getSelectionReport, } from '../../actions/orders/autopicker/manageOrders';
import { getInspectionReport } from '../../actions/orders/autopicker/manageInspectionReport'
import Header from '../common/headers/Header'
import { connect } from "react-redux";
import { Button, Table, Tag, } from 'antd';
import { SELECTION_ORDER_COLOR, INSPECTION_ORDER_COLOR, getTagColor } from '../../constants/colors';
import { useNavigate } from 'react-router-dom';
import { getColoredTagFromMap } from '../common/processMap';
import { OrderStatusMap } from '../../constants/enums';
import { printFIO } from '../common/utilUser';
import { ORDER_STATUSES } from '../../constants/const';
let thisObj;

let filterForStatus = [];
OrderStatusMap.forEach((value, key, map) => {
  filterForStatus.push({
    text: value,
    value: key,
  },)
})

class WithNavigate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      orders: [],
      autoPickers: [],
      editingOrder: '',
      selectedAutopickerId: '',
    };
    this.onEditOrder = this.onEditOrder.bind(this);
    this.isEditing = this.isEditing.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(findAll(localStorage.getItem("userId"))).then((data) => {
      thisObj.setState({ orders: data, isLoading: false })
    }
    )
  }

  onEditOrder(order) {
    const { dispatch } = this.props;
    console.log("On edit info " + order.autoUrl);
    this.setState({ editingOrder: order })
    if (order.autoUrl == null) {
      // dispatch(getOrderById(localStorage.getItem("userId"), order.id));
      dispatch(getSelectionReport(order.report));
      this.props.navigate("/auto-picker/" + order.autoPicker.id + "/selection-order/" + order.id, { push: true });
    }
    else {
      dispatch(getInspectionOrder(order));
      dispatch(getInspectionReport(order.report));
      this.props.navigate("/auto-picker/" + order.autoPicker.id + "/inspection-order/" + order.id, { push: true })
    };
  }

  isEditing = (record) => {
    return record === this.state.editingOrder;
  }

  render() {

    const columns = [
      {
        title: 'ID',
        key: "id",
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend'],
      },
      {
        title: 'Тип заказа',
        dataIndex: 'autoUrl',
        render: autoUrl => autoUrl == null ? <Tag color={SELECTION_ORDER_COLOR}>
          Подбор
        </Tag>
          : <Tag color={INSPECTION_ORDER_COLOR}>
            Осмотр
          </Tag>,

        filters: [
          {
            text: "Подбор",
            value: null,
          },
          {
            text: "Осмотр",
            value: "1",
          },
        ],
        onFilter: (value, record) => value == null ? record.autoUrl == null ? record : null : record.autoUrl != null ? record : null,
      },
      {
        title: 'Дата',
        dataIndex: 'creationDate',
        render: creationDate => creationDate.slice(0, 10) + " " + creationDate.slice(11, 19),
        defaultSortOrder: 'ascend',
        sorter: (a, b) => {
          return ('' + a.creationDate).localeCompare(b.creationDate)
        },
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Заказчик',
        dataIndex: ['creator'],
        render: creator => printFIO(creator),
      },
      {
        title: 'Статус',
        key: "status",
        dataIndex: ["status"],
        render: status => getColoredTagFromMap(OrderStatusMap, status.name, getTagColor(status.name)),
        filters: filterForStatus,
        onFilter: (value, record) => record.status.name.indexOf(value) === 0,
        //defaultFilteredValue: [OrderStatusMap., OrderStatusMap.get("IN_PROCESS").key ]
      },
      {
        title: 'Действие',
        key: "",
        //dataIndex: ,
        render: (order) =>
        // <Typography.Link onClick={() => this.onEditOrder(id)}>
        //   Edit
        // </Typography.Link>
        {
          if (order.status.name == ORDER_STATUSES.CLOSED || order.status.name == ORDER_STATUSES.CANCELED) {
            return <Button onClick={() => this.onEditOrder(order)}>Просмотреть</Button>;
          } else {
            return <Button onClick={() => this.onEditOrder(order)}>Редатировать</Button>;
          }
        }
        ,

      },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };


    return (<>
      <Header />

      <Table
        style={{
          marginLeft: "60px",
          marginRight: "60px",
          marginTop: "30px"
        }}
        columns={columns}
        dataSource={this.state.orders}
        onChange={onChange} />;
    </>
    )
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

function AutopickerOrdersPage(props) {
  let navigate = useNavigate();
  return <WithNavigate {...props} navigate={navigate} />
}

export default connect(mapStateToProps)(AutopickerOrdersPage)
