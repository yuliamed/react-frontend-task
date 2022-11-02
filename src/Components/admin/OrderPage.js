import React, { Component } from 'react'
import { findAll, setAutopicker } from '../../actions/orders/admin/manageOrders';
import Header from '../common/headers/Header'
import { connect } from "react-redux";
import { Button, Table, Tag, } from 'antd';
import { ORDER_STATUSES } from '../../constants/const';
import { SELECTION_ORDER_COLOR, INSPECTION_ORDER_COLOR, getTagColor } from '../../constants/colors';
import AutoPickerSelector from '../user/orders/AutoPickerSelector'
import { findAllAutoPickers } from "../../actions/manageUsers";
import { useNavigate } from 'react-router-dom';
import { getSelectionReport } from '../../actions/orders/autopicker/manageOrders';
let thisObj;

class WithNavigate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      orders: [],
      autoPickers: [],
      editingOrder: '',
      selectedAutopickerId: '',
      userId: "",
    };
    this.onEditOrder = this.onEditOrder.bind(this);
    this.getSelectedAutoPicker = this.getSelectedAutoPicker.bind(this);
    this.onCancelEdittingOrder = this.onCancelEdittingOrder.bind(this);
    this.onSaveAutoPicker = this.onSaveAutoPicker.bind(this);
    this.isEditing = this.isEditing.bind(this);
    thisObj = this;
  }

  async componentDidMount() {

    const { dispatch } = this.props;
    let userId = localStorage.getItem("userId");
    dispatch(findAll(userId)).then((data) => {
      thisObj.setState({
        orders: data.objects,
        isLoading: false,
        userId: userId
      })

    }
    )
    dispatch(findAllAutoPickers()).then((resp) => {
      console.log(resp)
      thisObj.setState({ autoPickers: resp.objects })
    })
  }

  getSelectedAutoPicker = (id) => {
    this.setState({ selectedAutopickerId: id })
  }

  onCancelEdittingOrder() {
    this.setState({ editingOrder: null })
  }

  async onSaveAutoPicker() {
    const { dispatch } = this.props;
    dispatch(setAutopicker(localStorage.getItem("userId"),
      this.state.editingOrder.id,
      this.state.selectedAutopickerId)).then((resp) => {
        alert("Autopicker set!");
        let newArr = [...this.state.orders];
        let index = newArr.findIndex((value) => value.id == this.state.editingOrder.id);
        newArr[index] = resp;
        this.setState({ orders: newArr, editingOrder: '', selectedAutopickerId: "" })
      })

  }


  onEditOrder(order) {
    console.log("On edit info " + order.autoUrl);
    this.setState({ editingOrder: order })
    const { dispatch } = this.props;
    dispatch(getSelectionReport(order.report))
    if (order.autoUrl == null)
      this.props.navigate("../users/" + this.state.userId + "/selection-order/" + order.id, { push: true });
    else this.props.navigate("../users/" + this.state.userId + "/inspection-order/" + order.id, { push: true });
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
            text: "Selection",
            value: null,
          },
          {
            text: "Inspection",
            value: "1",
          },
        ],
        onFilter: (value, record) => value == null ? record.autoUrl == null ? record : null : record.autoUrl != null ? record : null,
      },
      {
        title: 'Дата',
        dataIndex: 'creationDate',
        render: creationDate => creationDate.slice(0, 10) + " " + creationDate.slice(11, 19),
        defaultSortOrder: 'descend',
        sorter: (a, b) => {
          return ('' + a.creationDate).localeCompare(b.creationDate)
        },
        sortDirections: ['descend'],
      },
      {
        title: 'Автоподборщик',
        dataIndex: ['autoPicker'],
        render: (_, rec) => {
          console.log("auto-picker " + rec.id + " " + rec.autoPicker);
          const editable = this.isEditing(rec);
          return rec.autoPicker != null ?
            <Tag >{rec.autoPicker.name + " " + rec.autoPicker.surname}</Tag> :
            <>
              <Tag hidden={editable} color="magenta">не установлен</Tag>
              <Button hidden={editable} size='small' onClick={() => {
                console.log("object");
                this.setState({ editingOrder: rec })
              }}>изменить</Button>
              <div hidden={!editable}><AutoPickerSelector
                getSelectedAutoPicker={this.getSelectedAutoPicker}
                array={this.state.autoPickers}
              /></div>

              <Button hidden={!editable} disabled={this.state.selectedAutopickerId == ''} size='small' onClick={() => {
                this.onSaveAutoPicker();
                console.log("object - 1 ");
                // this.setState({ editingOrder: '', selectedAutopickerId: "" })
              }}>сохранить</Button>

              <Button hidden={!editable} size='small' onClick={() => {
                console.log("object - 2 ");
                this.setState({ editingOrder: '', selectedAutopickerId: "" })
              }}>отмена</Button>
            </>
        }
        ,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
      },
      {
        title: 'Заказчик',
        dataIndex: ['creator'],
        render: creator => creator.name + " " + creator.surname,
      },
      {
        title: 'Статус',
        key: "status",
        dataIndex: ["status"],
        render: status => <Tag color={getTagColor(status.name)}>
          {status.name}
        </Tag>,
        filters: [
          {
            text: ORDER_STATUSES.CREATED,
            value: ORDER_STATUSES.CREATED,
          },
          {
            text: ORDER_STATUSES.IN_PROCESS,
            value: ORDER_STATUSES.IN_PROCESS,
          },
          {
            text: ORDER_STATUSES.CANCELED,
            value: ORDER_STATUSES.CANCELED,
          },
          {
            text: ORDER_STATUSES.CLOSED,
            value: ORDER_STATUSES.CLOSED,
          },
        ],
        onFilter: (value, record) => record.status.name.indexOf(value) === 0,
      },
      {
        title: 'Действие',
        key: "",
        //dataIndex: ,
        render: (order) =>
          // <Typography.Link onClick={() => this.onEditOrder(id)}>
          //   Edit
          // </Typography.Link>
          <Button onClick={() => this.onEditOrder(order)}>Редактировать</Button>
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
  const { report } = state.autoPicker;
  return {
    isLoggedIn,
    message, report
  };
}

function OrderPage(props) {
  let navigate = useNavigate();
  return <WithNavigate {...props} navigate={navigate} />
}

export default connect(mapStateToProps)(OrderPage)
